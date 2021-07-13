import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { message } from 'antd';
import { ListItemDataType } from './data.d';
import {
  queryReviewerList,
  addReviewList,
  queryReviewerListLength,
  queryIsReviewedList,
  queryIsRejectedList,
} from './service';

export interface StateType {
  list?: ListItemDataType[];
  reviewedList?: ListItemDataType[];
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
    addReview: Effect;
    fetchListLength: Effect;
    fetchReviewed: Effect;
    appendFetchReviewed: Effect;
    fetchRejected: Effect;
    appendFetchRejected: Effect;
  };
  reducers: {
    queryList: Reducer<StateType>;
    appendList: Reducer<StateType>;
    listLength: Reducer<StateType>;
    queryReviewedList: Reducer<StateType>;
    appendRevieweredList: Reducer<StateType>;
    queryRejectedList: Reducer<StateType>;
    appendRejectedList: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'checkAndReview',

  state: {
    list: [],
    reviewedList: [],
    rejectedList: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryReviewerList, payload);
      console.log('response', response);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *appendFetch({ payload }, { call, put }) {
      const response = yield call(queryReviewerList, payload);
      yield put({
        type: 'appendList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *fetchListLength({ payload }, { call, put }) {
      const response = yield call(queryReviewerListLength, payload);
      yield put({
        type: 'listLength',
        payload: response,
      });
    },
    *fetchReviewed({ payload }, { call, put }) {
      const response = yield call(queryIsReviewedList, payload);
      yield put({
        type: 'queryReviewedList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *appendFetchReviewed({ payload }, { call, put }) {
      const response = yield call(queryIsReviewedList, payload);
      yield put({
        type: 'appendRevieweredList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *fetchRejected({ payload }, { call, put }) {
      const response = yield call(queryIsRejectedList, payload);
      yield put({
        type: 'queryRejectedList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *appendFetchRejected({ payload }, { call, put }) {
      const response = yield call(queryIsRejectedList, payload);
      yield put({
        type: 'appendRejectedList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *addReview({ payload }, { call }) {
      yield call(addReviewList, payload);
      message.success('审核完成');
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
    listLength(state, action) {
      return {
        ...state,
        listLength: action.payload.listLength,
      };
    },
    queryReviewedList(state, action) {
      return {
        ...state,
        reviewedList: action.payload,
      };
    },
    appendRevieweredList(state, action) {
      return {
        ...state,
        reviewedList: (state as StateType).reviewedList.concat(action.payload),
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
        rejectedList: (state as StateType).reviewedList.concat(action.payload),
      };
    },
  },
};

export default Model;
