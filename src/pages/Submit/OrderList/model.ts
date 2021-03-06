import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { message } from 'antd';
import { ProjectItemDataType } from '../data.d';
import { queryOrderList, queryRejectedOrderList, SubmitForm, removeForm, queryProject } from '../service';

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
    appendFetch: Effect;
    fetchRejected: Effect;
    appendRejected: Effect;
    updateForms: Effect;
    deleteForms: Effect;
  };
  reducers: {
    queryList: Reducer<StateType>;
    queryProject: Reducer<StateType>;
    appendList: Reducer<StateType>;
    queryRejectedList: Reducer<StateType>;
    appendRejectedList: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'submitAndOrderList',

  state: {
    list: [],
    rejectedList: [],
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
      abnormalInstruction: ""
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
      const response = yield call(queryProject, payload);
      console.log(response)
      yield put({
        type: 'queryProject',
        payload: response,
      })
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
    queryList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    queryProject(state, action) {
      return {
        ...state,
        project: action.payload,
      };
    },
    appendList(state, action) {
      return {
        ...state,
        list: (state as StateType).list.concat(action.payload),
      };
    },
    queryRejectedList(state, action) {
      return {
        ...state,
        rejectedList: action.payload,
      };
    },
    appendRejectedList(state, action) {
      return {
        ...state,
        rejectedList: (state as StateType).rejectedList.concat(action.payload),
      };
    },
  },
};

export default Model;
