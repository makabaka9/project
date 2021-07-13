// import { Effect, Reducer } from 'umi';
import { Reducer } from 'redux';
// import { EffectsCommandMap } from 'dva';
// import { message } from 'antd';
// import { ListItemDataType } from './data.d';
import { Effect } from 'dva';
import { ListItemDataType } from './data.d';
import { queryReportList, queryOrderIDReportList, queryOrderOtherList } from './service';

export interface StateType {
  list: ListItemDataType[];
  total: number;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetch: Effect;
    fetchMore: Effect;
    fetchOrderID: Effect;
    fetchOther: Effect;
    fetchOtherMore: Effect;
  };
  reducers: {
    queryList: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'reportAndSummary',

  state: {
    list: [],
    total: 0,
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryReportList, payload);
      yield put({
        type: 'queryList',
        payload: response,
      });
    },
    *fetchMore({ payload }, { call, put }) {
      const response = yield call(queryReportList, payload);
      yield put({
        type: 'queryList',
        payload: response,
      });
    },
    *fetchOrderID({ payload }, { call, put }) {
      const response = yield call(queryOrderIDReportList, payload);
      yield put({
        type: 'queryList',
        payload: response,
      });
    },
    *fetchOther({ payload }, { call, put }) {
      const response = yield call(queryOrderOtherList, payload);

      yield put({
        type: 'queryList',
        payload: response,
      });
    },
    *fetchOtherMore({ payload }, { call, put }) {
      const response = yield call(queryOrderOtherList, payload);

      yield put({
        type: 'queryList',
        payload: response,
      });
    },
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        list: action.payload.data,
        total: action.payload.total,
      };
    },
  },
};

export default Model;
