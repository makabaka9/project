import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { message } from 'antd';
import { ListItemDataType } from './data.d';
import { queryReviewerList, addReviewList } from './service';

export interface StateType {
  list?: ListItemDataType[];
  user?: [];
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
    // fetchUser: Effect;
    addReview: Effect;
  };
  reducers: {
    queryList: Reducer<StateType>;
    appendList: Reducer<StateType>;
    // queryUser: Reducer<StateType>;
    // addList: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'reportAndReview',

  state: {
    list: [],
    user: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryReviewerList, payload);
      // console.log(response);
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
    // *fetchUser({ payload }, { call, put }) {
    //   const response = yield call(queryUserList, payload);
    //   const user = response.data.map((item: { username: string; key: string; role: string }) => ({
    //     title: item.username,
    //     key: item.key,
    //     value: item.key,
    //     role: item.role,
    //   }));
    //   yield put({
    //     type: 'queryUser',
    //     payload: user,
    //   });
    // },
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
