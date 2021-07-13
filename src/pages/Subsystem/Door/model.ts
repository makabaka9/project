import { Effect, Reducer } from 'umi';

import { BasicGood } from './data.d';
import { queryBasicProfile } from './service';
import {queryFaultInfo,queryFaultStatus,queryDoorStatus} from "@/pages/Subsystem/Door/service";

export interface StateType {
  basicGoods: BasicGood[];
  doorStatus: any;
  faultStatus: any;
  faultInfo: any;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetchBasic: Effect;
    fetchFaultInfo: Effect;
    fetchFaultStatus: Effect;
    fetchDoorStatus: Effect;
  };
  reducers: {
    show: Reducer<StateType>;
    faultInfo: Reducer<StateType>;
    faultStatus: Reducer<StateType>;
    doorStatus: Reducer<StateType>;

  };
}

const Model: ModelType = {
  namespace: 'SubsystemAndDoor',

  state: {
    basicGoods: [],
    doorStatus:{},
    faultStatus:{},
    faultInfo: {
      pageList: [],
      countTotal: 0,
    }
  },

  effects: {
    *fetchBasic(_, { call, put }) {
      const response = yield call(queryBasicProfile);
      yield put({
        type: 'show',
        payload: response,
      });
    },
    *fetchFaultInfo({ payload }, { call, put }) {
      const response = yield call(queryFaultInfo, payload);
      yield put({
        type: 'faultInfo',
        payload: response,
      });
    },
    *fetchFaultStatus({ payload }, { call, put }) {
      const response = yield call(queryFaultStatus, payload);
      yield put({
        type: 'faultStatus',
        payload: response,
      });
    },
    *fetchDoorStatus({ payload }, { call, put }) {
      const response = yield call(queryDoorStatus, payload);
      yield put({
        type: 'doorStatus',
        payload: response,
      });
    },
  },

  reducers: {
    show(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    faultInfo(state, action) {
      return {
        ...state,
        faultInfo: action.payload
      };
    },
    faultStatus(state, action) {
      return {
        ...state,
        faultStatus: action.payload
      };
    },
    doorStatus(state, action) {
      return {
        ...state,
        doorStatus: action.payload
      };
    },
  },
};

export default Model;
