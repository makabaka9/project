import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { message } from 'antd';
import { ProjectItemDataType } from './data.d';
import { queryOrderList, queryRejectedOrderList, removeForm, queryProjectById, UpdateFormById } from './service';
import { SubmitForm } from '../Submit/service';

export interface StateType {
  list?: ProjectItemDataType[];
  project: ProjectItemDataType;
  usercode?: string;
  rejectedList?: ProjectItemDataType[];
  projectID?: string;
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetch: Effect;
    fetchById: Effect;
    submitStepForm: Effect;
    appendFetch: Effect;
    fetchRejected: Effect;
    appendRejected: Effect;
    updateForms: Effect;
    deleteForms: Effect;
  };
  reducers: {
    //queryList: Reducer<StateType>;
    queryProject: Reducer<StateType>;
    saveStepFormData: Reducer<StateType>;
    //appendList: Reducer<StateType>;
    //queryRejectedList: Reducer<StateType>;
    //appendRejectedList: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'Project',

  state: {
    project: {
      projectBudget: "",
      projectCategory: "",
      projectCompany: "",
      projectEndTime: "",
      projectID: "",
      projectIntroduction: "",
      projectManager: "",
      projectName: "",
      projectOutsource: "",
      projectProgress: "",
      projectResearchContent: "",
      projectStartTime: "",
      projectFunds: "",
      abnormalInstruction: "",
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryOrderList, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *fetchById({ payload }, { call, put }) {
      console.log(payload)
      const response = yield call(queryProjectById, payload);
      console.log(response)
      yield put({
        type: 'queryProject',
        payload: response,
      })
    },
    *submitStepForm({ payload }, { call, put }) {
      // yield call()?????????????????? ?????????????????????????????? ??? ???????????????yield??????????????????
      //const response = yield call(CurrentUser, payload);//????????????????????????
      //????????????
      const submitPayload = payload;
      console.log(submitPayload)
      const response = yield call(UpdateFormById, submitPayload);//call effect-->service-->reducer
      yield put({//put??????????????? Action???????????? dispatch effect-->reducer
        type: 'saveStepFormData',
        payload,
        response,
      });
    },
    *appendFetch({ payload }, { call, put }) {
      const response = yield call(queryOrderList, payload);
      yield put({
        type: 'appendList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *fetchRejected({ payload }, { call, put }) {
      const response = yield call(queryRejectedOrderList, payload);
      yield put({
        type: 'queryRejectedList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *appendRejected({ payload }, { call, put }) {
      const response = yield call(queryRejectedOrderList, payload);
      yield put({
        type: 'appendRejectedList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *updateForms({ payload }, { call }) {
      yield call(SubmitForm, payload);
      message.success('????????????');
    },
    *deleteForms({ payload }, { call }) {
      yield call(removeForm, payload);
    },
  },

  reducers: {
    // queryList(state, action) {
    //   return {
    //     ...state,
    //     list: action.payload,
    //   };
    // },
    queryProject(state, action) {
      return {
        ...state,
        project: action.payload,
      };
    },
    saveStepFormData(state, action) {//??????????????????
      console.log(action)
      return {
        ...state,
        project: action.payload,
        submit: action.response,
      };
    },
    // appendList(state, action) {
    //   return {
    //     ...state,
    //     list: (state as StateType).list.concat(action.payload),
    //   };
    // },
    // queryRejectedList(state, action) {
    //   return {
    //     ...state,
    //     rejectedList: action.payload,
    //   };
    // },
    // appendRejectedList(state, action) {
    //   return {
    //     ...state,
    //     rejectedList: (state as StateType).rejectedList.concat(action.payload),
    //   };
    // },
  },
};

export default Model;
