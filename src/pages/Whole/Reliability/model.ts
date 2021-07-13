import { Effect, Reducer } from 'umi';
import {
  queryWholeMTBF,
  querySubsystemFaultLevel,
  queryReliability,
  queryWholeFaultLevelMTBF,
  queryAvgMDBF,
  querySubsystemFaultLevelRate,
  queryAvgMTBF,
} from './service';
import moment from 'moment';

export interface StateType {
  wholeMTBF: Array<object>;
  subsystemFaultLevel: Array<object>;
  subsystemFaultLevelRate: Array<object>;
  avgMTBF: Array<object>;
  avgMDBF: Array<object>;
  wholeFaultLevelMTBF: Array<object>;
  reliability: Array<object>;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetchWholeMTBF: Effect;
    fetchSubsystemFaultLevel: Effect;
    fetchSubsystemFaultLevelRate: Effect;
    fetchAvgMTBF: Effect;
    fetchAvgMDB: Effect;
    fetchWholeFaultLevelMTBF: Effect;
    fetchReliability: Effect;
  };
  reducers: {
    wholeMTBF: Reducer<StateType>;
    subsystemFaultLevel: Reducer<StateType>;
    subsystemFaultLevelRate: Reducer<StateType>;
    avgMTBF: Reducer<StateType>;
    avgMDBF: Reducer<StateType>;
    wholeFaultLevelMTBF: Reducer<StateType>;
    reliability: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'wholeAndReliability',
  state: {
    wholeMTBF: [],
    subsystemFaultLevel: [],
    subsystemFaultLevelRate: [],
    avgMTBF: [],
    avgMDBF: [],
    wholeFaultLevelMTBF: [],
    reliability: [],
  },

  effects: {
    *fetchWholeMTBF({ payload }, { call, put }) {
      const response = yield call(queryWholeMTBF, payload);
      const result = response.map((item) => ({
        time: moment(item.time).format('MM-DD'),
        number: item.number,
      }));
      yield put({
        type: 'wholeMTBF',
        payload: result,
      });
    },
    *fetchSubsystemFaultLevel({ payload }, { call, put }) {
      const response = yield call(querySubsystemFaultLevel, payload);
      const result = response.map((item) => ({
        type: item.type,
        number: item.number,
      }));
      yield put({
        type: 'subsystemFaultLevel',
        payload: result,
      });
    },

    *fetchSubsystemFaultLevelRate({ payload }, { call, put }) {
      const response = yield call(querySubsystemFaultLevelRate, payload);
      const result = response.map((item) => ({
        time: moment(item.time).format('MM-DD'),
        type: item.type,
        value: item.value,
      }));
      yield put({
        type: 'subsystemFaultLevelRate',
        payload: result,
      });
    },

    *fetchAvgMTBF({ payload }, { call, put }) {
      const response = yield call(queryAvgMTBF, payload);
      const result = response.map((item) => ({
        time: moment(item.time).format('MM-DD'),
        type: item.type,
        value: item.value,
      }));
      yield put({
        type: 'avgMTBF',
        payload: result,
      });
    },
    *fetchAvgMDB({ payload }, { call, put }) {
      const response = yield call(queryAvgMDBF, payload);
      const result = response.map((item) => ({
        time: moment(item.time).format('MM-DD'),
        type: item.type,
        value: item.value,
      }));
      yield put({
        type: 'avgMDBF',
        payload: result,
      });
    },
    *fetchWholeFaultLevelMTBF({ payload }, { call, put }) {
      const response = yield call(queryWholeFaultLevelMTBF, payload);
      const result = response.map((item) => ({
        time: moment(item.time).format('MM-DD'),
        type: item.type,
        value: item.value,
      }));
      yield put({
        type: 'wholeFaultLevelMTBF',
        payload: result,
      });
    },
    *fetchReliability({ payload }, { call, put }) {
      const response = yield call(queryReliability, payload);
      const result = response.map((item) => ({
        systemName: item.systemName,
        grade: item.grade,
      }));
      yield put({
        type: 'reliability',
        payload: result,
      });
    },
  },
  reducers: {
    wholeMTBF(state, { payload }) {
      return {
        ...state,
        wholeMTBF: payload,
      };
    },
    subsystemFaultLevel(state, { payload }) {
      return {
        ...state,
        subsystemFaultLevel: payload,
      };
    },
    subsystemFaultLevelRate(state, { payload }) {
      return {
        ...state,
        subsystemFaultLevelRate: payload,
      };
    },
    avgMTBF(state, { payload }) {
      return {
        ...state,
        avgMTBF: payload,
      };
    },
    avgMDBF(state, { payload }) {
      return {
        ...state,
        avgMDBF: payload,
      };
    },
    wholeFaultLevelMTBF(state, { payload }) {
      return {
        ...state,
        wholeFaultLevelMTBF: payload,
      };
    },
    reliability(state, { payload }) {
      return {
        ...state,
        reliability: payload,
      };
    },
  },
};

export default Model;
