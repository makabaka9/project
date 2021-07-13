import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { SubmitForm, CurrentUser } from '../service';
import { ProjectItemDataType } from '../data';

export interface StateType {
  current?: string;
  step?: ProjectItemDataType[];
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
  namespace: 'ProjectSubmitProcess',//'SubmitProcess',

  state: {
    current: 'info',

    step: {
      projectID:'',
      projectManager:'', 
      projectCompany:'',
      projectName:'',
      projectCategory:'',
      projectStartTime:'',
      projectEndTime:'',
      projectBudget:'',
      projectOutsource:'',
      projectIntroduction:'',
      projectResearchContent:'',
      // orderID,
      // physicalChemicalType: '理化检测委托单',
      // clientCompany: ' ',
      // clientDate: '',
      // clientAgent: '',
      // clientPhone: '',
      // clientAddress: '',
      // sampleName: '',
      // sampleMaterial: '',
      // sampleModel: '',
      // sampleNumber: '',
      // sampleQuantity: '1',
      // sampleDraw: '',
      // sampleState: '',
      // sampleProcess: '',
      // detectionMethod: '委托人同意采用本部门使用的检测方法',
      // processingMethod: '本部门加工',
      // processingRequire: [],
      // completeTime: '正常',
      // disposalMethod: '本中心处理',
      // chemicalComposition: [],
      // Metallography: [],
      // stretchingTest: [],
      // bendingTest: '',
      // bendingDiameter: '',
      // impactTest: '',
      // hardnessTest: [],
      // springTest: '',
      // gaps: '',
      // impactTestTemperature: '',
      // workLoad: '',
      // gapsQuantity: '',
      // testItems: '',
      // usercode: '',
      // username: '',
      // submitTime: '',
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
    saveCurrentStep(state, { payload }) {//保存步骤信息
      return {
        ...state,
        current: payload,
      };
    },

    saveStepFormData(state, { payload }) {//保存填写的信息
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
