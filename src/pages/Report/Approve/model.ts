import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { message } from 'antd';
import { ListItemDataType } from './data.d';
import { queryApproveList, addApproveList } from './service';

export interface StateType {
  list?: ListItemDataType[];
  // user?: [];
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
    addApprove: Effect;
  };
  reducers: {
    queryList: Reducer<StateType>;
    appendList: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'reportAndApprove',

  state: {
    list: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryApproveList, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
      });
    },

    *appendFetch({ payload }, { call, put }) {
      const response = yield call(queryApproveList, payload);
      yield put({
        type: 'appendList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *addApprove({ payload }, { call }) {
      yield call(addApproveList, payload);
      message.success('审核通过');
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
    // queryUser(state, action) {
    //   return {
    //     ...state,
    //     user: action.payload,
    //   };
    // },
    // addList(state, action) {
    //   return {
    //     ...state,
    //     list: action.payload,
    //   };
    // },
  },
};

export default Model;
