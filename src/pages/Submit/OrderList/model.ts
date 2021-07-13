import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { message } from 'antd';
import { ListItemDataType } from '../data.d';
import { queryOrderList, queryRejectedOrderList, SubmitForm, removeForm } from '../service';

export interface StateType {
  list?: ListItemDataType[];
  usercode?: string;
  rejectedList?: ListItemDataType[];
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
    appendFetch: Effect;
    fetchRejected: Effect;
    appendRejected: Effect;
    updateForms: Effect;
    deleteForms: Effect;
  };
  reducers: {
    queryList: Reducer<StateType>;
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
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryOrderList, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
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
      message.success('更新完成');
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
