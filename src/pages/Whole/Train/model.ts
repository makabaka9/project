import { Effect, Reducer } from 'umi';

import {
  BasicProfileDataType,
  BasicInfoDataType,
  ReliabilityDataType,
  ComfortDataType,
  StabilityDataType,
} from './data.d';
import { queryBasicInfo, queryReliability, queryComfort, queryStability } from './service';

export interface StateType {
  // basicGoods: BasicGood[];
  basicInfo: BasicProfileDataType[];
  reliability: ReliabilityDataType;
  comfort: ComfortDataType;
  stability: StabilityDataType;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetchBasicInfo: Effect;
    fetchReliability: Effect;
    fetchComfort: Effect;
    fetchStability: Effect;
  };
  reducers: {
    basic: Reducer<StateType>;
    reliability: Reducer<StateType>;
    comfort: Reducer<StateType>;
    stability: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'wholeAndTrain',
  state: {
    basicInfo: [],
    reliability: {
      trainCode: '',
      MTBF: 0,
      MDBSF: 0,
      reliabilityScore: 0,
      systemNumber: [
        {
          type: '',
          value: 0,
        },
      ],
    },
    comfort: {
      trainCode: '',
      temperatureScore: 0,
      crowdingScore: 0,
      travelScore: 0,
      jerkScore: 0,
      systemScore: [
        {
          type: '',
          value: 0,
        },
      ],
    },
    stability: {
      trainCode: '',
      drivingSafetyScore: 0,
      efficiencyScore: 0,
      faultCorrelationScore: 0,
      maintenanceComplexityScore: 0,
      systemScore: [
        {
          type: '',
          value: 0,
        },
      ],
    },
  },

  effects: {
    *fetchBasicInfo({ payload }, { call, put }) {
      const response = yield call(queryBasicInfo, payload);
      yield put({
        type: 'basic',
        payload: response,
      });
    },
    *fetchReliability({ payload }, { call, put }) {
      const response = yield call(queryReliability, payload);
      yield put({
        type: 'reliability',
        payload: response,
      });
    },
    *fetchComfort({ payload }, { call, put }) {
      const response = yield call(queryComfort, payload);
      yield put({
        type: 'comfort',
        payload: response,
      });
    },
    *fetchStability({ payload }, { call, put }) {
      const response = yield call(queryStability, payload);
      yield put({
        type: 'stability',
        payload: response,
      });
    },
  },

  reducers: {
    basic(state, { payload }) {
      return {
        ...state,
        basicInfo: payload,
        // ...payload,
      };
    },
    reliability(state, { payload }) {
      return {
        ...state,
        reliability: payload,
        // ...payload,
      };
    },
    comfort(state, { payload }) {
      return {
        ...state,
        comfort: payload,
        // ...payload,
      };
    },
    stability(state, { payload }) {
      return {
        ...state,
        stability: payload,
        // ...payload,
      };
    },
  },
};

export default Model;
