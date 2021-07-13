import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { SubmitForm, CurrentUser } from '../service';
import { CalibrationItemDataType } from '../data.d';

export interface StateType {
  current?: string;
  step?: CalibrationItemDataType[];
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    submitStepForm: Effect;
    // fetchCurrentUser: Effect;
  };
  reducers: {
    saveStepFormData: Reducer<StateType>;
    saveCurrentStep: Reducer<StateType>;
    saveCurrentUserInfo: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'Submit',

  state: {
    current: 'info',

    step: {
      // orderID,
      calibrationTestType: '计量校准委托单',
      clientCompany: '',
      clientDate: '',
      clientAgent: '',
      clientPhone: '',
      clientAddress: '',
      sampleName: '',
      sampleModel: '',
      sampleNumber: '',
      sampleQuantity: '1',
      completeTime: '正常',
      attachment: '',
      visualInspection: '',
      calibrationHours: '',
      calibrationCost: '',
      repairCost: '',
      clientRequire: '',
      usercode: '',
      username: '',
      submitTime: '',
    },
  },

  effects: {
    *submitStepForm({ payload }, { call, put }) {
      const response = yield call(CurrentUser, payload);
      const submitPayload = payload;
      const submitTime = new Date().getTime();
      const flowStep = 0;
      submitPayload.usercode = response.usercode;
      submitPayload.username = response.username;
      submitPayload.submitTime = submitTime;
      submitPayload.flowStep = flowStep;
      yield call(SubmitForm, submitPayload);
      yield put({
        type: 'saveStepFormData',
        payload,
      });
      yield put({
        type: 'saveCurrentStep',
        payload: 'result',
      });
    },
  },

  reducers: {
    saveCurrentStep(state, { payload }) {
      return {
        ...state,
        current: payload,
      };
    },

    saveStepFormData(state, { payload }) {
      return {
        ...state,
        step: {
          ...(state as StateType).step,
          ...payload,
        },
      };
    },
    saveCurrentUserInfo(state, { payload, submitTime, flowStep }) {
      return {
        ...state,
        step: {
          ...(state as StateType).step,
          usercode: payload.usercode,
          username: payload.username,
          submitTime,
          flowStep,
        },
      };
    },
  },
};

export default Model;
