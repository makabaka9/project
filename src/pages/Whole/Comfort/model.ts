import { Effect, Reducer } from 'umi';

import { TagType, EnvironmentDataType, SpeedDataType, LashDataType } from './data.d';
import { queryEnvironment, querySpeed, queryLash } from './service';

export interface StateType {
  environment: EnvironmentDataType;
  speed: SpeedDataType;
  lash: LashDataType;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetchEnvironment: Effect;
    fetchSpeed: Effect;
    fetchLash: Effect;
  };
  reducers: {
    environment: Reducer<StateType>;
    speed: Reducer<StateType>;
    lash: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'wholeAndComfort',
  state: {
    environment: {
      mainPrice: 0,
      evaluationScore: 0,
      Tooltip: '',
      temperatureComfort: [
        {
          time: new Date(),
          value: 0,
        },
      ],
      crowding: [
        {
          time: new Date(),
          value: 0,
        },
      ],
    },
    speed: {
      score: 0,
      onTime: true,
      travelAppraise: [
        {
          time: new Date(),
          value: 0,
        },
      ],
    },
    lash: {
      score: 0,
      speed: [
        {
          time: new Date(),
          type: '',
          value: 0,
        },
      ],
    },
  },

  effects: {
    *fetchEnvironment({ payload }, { call, put }) {
      const response = yield call(queryEnvironment, payload);
      yield put({
        type: 'environment',
        payload: response,
      });
    },
    *fetchSpeed({ payload }, { call, put }) {
      const response = yield call(querySpeed, payload);
      yield put({
        type: 'speed',
        payload: response,
      });
    },
    *fetchLash({ payload }, { call, put }) {
      const response = yield call(queryLash, payload);
      yield put({
        type: 'lash',
        payload: response,
      });
    },
  },

  reducers: {
    environment(state, action) {
      return {
        ...state,
        environment: action.payload,
      };
    },
    speed(state, action) {
      return {
        ...state,
        speed: action.payload,
      };
    },
    lash(state, action) {
      return {
        ...state,
        lash: action.payload,
      };
    },
  },
};

export default Model;
