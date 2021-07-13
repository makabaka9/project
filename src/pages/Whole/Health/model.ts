import { Effect, Reducer } from 'umi';
import {
  queryFault,
  queryEffect,
  queryDimension,
  queryFourdimension,
  queryMachine,
  queryDoor,
  queryElectric,
  queryStop,
} from './service';
import { EffectDataType, DimensionDataType } from './data';
import moment from 'moment';

export interface subsystemType {
  fault: Array<object>;
  accident: Array<object>;
}
export interface StateType {
  fault: Array<object>;
  fourdimension: Array<object>;
  effect: EffectDataType;
  dimension: DimensionDataType;
  machine: subsystemType;
  door: subsystemType;
  electric: subsystemType;
  stop: subsystemType;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetchFault: Effect;
    fetchFourdimension: Effect;
    fetchEffect: Effect;
    fetchDimension: Effect;
    fetchMachine: Effect;
    // fetchAccident: Effect;
    fetchDoor: Effect;
    fetchElectric: Effect;
    fetchStop: Effect;
  };
  reducers: {
    fault: Reducer<StateType>;
    fourdimension: Reducer<StateType>;
    effect: Reducer<StateType>;
    dimension: Reducer<StateType>;
    machine: Reducer<StateType>;
    // accident: Reducer<StateType>;
    door: Reducer<StateType>;
    electric: Reducer<StateType>;
    stop: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'wholeAndHealth',

  state: {
    fault: [],
    fourdimension: [],
    effect: {
      mainScore: 0,
      effectNumber: 0,
      faultLevel: '',
      subSystemType: '',
      faultValue: '',
      time: new Date(),
      effect: '',
      faultRate: 0,
    },
    dimension: {
      deminsion: '',
      drivingSafetyScore: 0,
      efficiencyScore: '',
      correlationScore: '',
      complexityScore: '',
    },
    machine: {
      fault: [],
      accident: [],
    },
    door: {
      fault: [],
      accident: [],
    },
    electric: {
      fault: [],
      accident: [],
    },
    stop: {
      fault: [],
      accident: [],
    },
  },

  effects: {
    *fetchFault({ payload }, { call, put }) {
      const response = yield call(queryFault, payload);
      const result = response.map((item) => ({
        time: moment(item.time).format('YYYY-MM-DD'),
        solveType: item.solveType,
        faultContent: item.faultContent,
      }));
      yield put({
        type: 'fault',
        payload: result,
      });
    },
    *fetchFourdimension({ payload }, { call, put }) {
      const response = yield call(queryFourdimension, payload);

      yield put({
        type: 'fourdimension',
        payload: response,
      });
    },
    *fetchEffect({ payload }, { call, put }) {
      const response = yield call(queryEffect, payload);

      // const result = response.map(item => ({
      //   time: moment(item.time).format("YYYY-MM-DD"),
      //   mainScore: item.mainScore,
      //   effectNumber: item.effectNumber,
      //   faultLevel: item.faultLevel,
      //   subSystemType: item.subSystemType,
      //   faultValue: item.faultValue,
      //   effect: item.effect,
      //   faultRate: item.faultRate,
      // }))
      yield put({
        type: 'effect',
        payload: response,
      });
    },
    *fetchDimension({ payload }, { call, put }) {
      const response = yield call(queryDimension, payload);

      yield put({
        type: 'dimension',
        payload: response,
      });
    },
    *fetchMachine({ payload }, { call, put }) {
      const response = yield call(queryMachine, payload);

      yield put({
        type: 'machine',
        payload: response,
      });
    },
    *fetchDoor({ payload }, { call, put }) {
      const response = yield call(queryDoor, payload);

      yield put({
        type: 'door',
        payload: response,
      });
    },
    *fetchElectric({ payload }, { call, put }) {
      const response = yield call(queryElectric, payload);

      yield put({
        type: 'electric',
        payload: response,
      });
    },
    *fetchStop({ payload }, { call, put }) {
      const response = yield call(queryStop, payload);

      yield put({
        type: 'stop',
        payload: response,
      });
    },
  },

  reducers: {
    fault(state, action) {
      return {
        ...state,
        fault: action.payload,
      };
    },
    fourdimension(state, action) {
      return {
        ...state,
        fourdimension: action.payload,
      };
    },
    effect(state, action) {
      return {
        ...state,
        effect: action.payload,
      };
    },
    dimension(state, action) {
      return {
        ...state,
        dimension: action.payload,
      };
    },
    machine(state, action) {
      return {
        ...state,
        machine: action.payload,
      };
    },
    door(state, action) {
      return {
        ...state,
        door: action.payload,
      };
    },
    electric(state, action) {
      return {
        ...state,
        electric: action.payload,
      };
    },
    stop(state, action) {
      return {
        ...state,
        stop: action.payload,
      };
    },
  },
};

export default Model;
