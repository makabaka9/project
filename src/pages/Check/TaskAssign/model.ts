import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { message } from 'antd';
import { ListItemDataType } from './data.d';
import {
  queryMonitorOrderList,
  queryUserList,
  addMonitorOrderList,
  queryMonitorAssignedOrderList,
  queryMonitorOrderListLength,
} from './service';

export interface StateType {
  list?: ListItemDataType[];
  assignedList?: ListItemDataType[];
  listLength?: number;
  user?: any[];
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
    fetchUser: Effect;
    addAssign: Effect;
    fetchAssigned: Effect;
    appendFetchAssigned: Effect;
    fetchListLength: Effect;
  };
  reducers: {
    queryList: Reducer<StateType>;
    appendList: Reducer<StateType>;
    queryUser: Reducer<StateType>;
    listLength: Reducer<StateType>;
    queryAssignedList: Reducer<StateType>;
    appendAssignedList: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'checkAndTaskAssign',

  state: {
    list: [],
    assignedList: [],
    user: [],
    listLength: 0,
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryMonitorOrderList, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *appendFetch({ payload }, { call, put }) {
      const response = yield call(queryMonitorOrderList, payload);
      yield put({
        type: 'appendList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *fetchListLength({ payload }, { call, put }) {
      const response = yield call(queryMonitorOrderListLength, payload);
      yield put({
        type: 'listLength',
        payload: response,
      });
    },
    *fetchAssigned({ payload }, { call, put }) {
      const response = yield call(queryMonitorAssignedOrderList, payload);
      yield put({
        type: 'queryAssignedList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *appendFetchAssigned({ payload }, { call, put }) {
      const response = yield call(queryMonitorAssignedOrderList, payload);
      yield put({
        type: 'appendAssignedList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *fetchUser({ payload }, { call, put }) {
      const response = yield call(queryUserList, payload);
      yield put({
        type: 'queryUser',
        payload: response,
      });
    },
    *addAssign({ payload }, { call }) {
      yield call(addMonitorOrderList, payload);
      message.success('检测任务分配成功');
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
    queryUser(state, action) {
      return {
        ...state,
        user: action.payload,
      };
    },
    queryAssignedList(state, action) {
      return {
        ...state,
        assignedList: action.payload,
      };
    },
    appendAssignedList(state, action) {
      return {
        ...state,
        assignedList: (state as StateType).assignedList.concat(action.payload),
      };
    },
  },
};

export default Model;
