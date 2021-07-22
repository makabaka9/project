import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { SubmitForm, CurrentUser } from '../service';
import { ProjectItemDataType } from '../data.d';

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
  namespace: 'SubmitProcess',//namespace 表示在全局 state 上的 key

  state: {//state 是初始值
    current: 'info',

    step: {
      projectID: '',
      projectManager: '',
      projectCompany: '',
      projectName: '',
      projectCategory: '',
      projectStartTime: '',
      projectEndTime: '',
      projectBudget: '',
      projectOutsource: '',
      projectIntroduction: '',
      projectResearchContent: '',
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
  //Effect 是一个 Generator 函数，内部使用 yield 关键字，标识每一步的操作（不管是异步或同步）
  effects: {
    *submitStepForm({ payload }, { call, put }) {
      // yield call()执行异步函数 来调用（数据接口方法 和 请求参数）yield表示同步调用
      const response = yield call(CurrentUser, payload);//获取登陆用户信息
      //存储数据
      const submitPayload = payload;
      submitPayload.projectProgress = "等待审批";
      //const submitTime = new Date().getTime();
      //const flowStep = 0;
      //submitPayload.usercode = response.usercode;
      //submitPayload.username = response.username;
      //submitPayload.submitTime = submitTime;
      //submitPayload.flowStep = flowStep;
      yield call(SubmitForm, submitPayload);//call effect-->service-->reducer
      yield put({//put：发出一个 Action，类似于 dispatch effect-->reducer
        type: 'saveStepFormData',
        payload,
      });
      yield put({
        type: 'saveCurrentStep',
        payload: 'result',
      });
    },
  },
  // reducers 等同于 redux 里的 reducer，接收 action，同步更新 state
  reducers: {
    saveCurrentStep(state, { payload }) {//保存步骤信息
      return {
        ...state,
        current: payload,
      };
    },

    saveStepFormData(state, { payload }) {//保存表单信息
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
