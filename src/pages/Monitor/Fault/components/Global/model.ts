import { Effect, Reducer } from 'umi';
import { SearchDataType, subFaultType} from './data.d';
import {
  queryTrainList,
  queryFaultSubsystem,
} from './service';
// import { queryReliability } from '../HMI/service';

export interface StateType {
  dataList?: Array<SearchDataType>;
  subFaultList?: Array<subFaultType>;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetch: Effect;
    fetchFaultSubsystem: Effect;
    // fetchCurrentDir: Effect;
    // fetchFaultDistribution: Effect;
  };
  reducers: {
    getData: Reducer<StateType>;
    queryFaultSubsystem: Reducer<StateType>;
    queryCurrentDir: Reducer<StateType>;
    queryState:Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'faultAndGlobal',

  state: {
    dataList: [],
    subFaultList: [],
  },

  effects: {
    *fetch({ }, { call, put }) {
      const dataList = yield call(queryTrainList);

      yield put({
        type: 'getData',
        payload: dataList,
      });
    },
    *fetchFaultSubsystem({ }, { call, put }) {
      const subFaultList = yield call(queryFaultSubsystem);
      // const subFaultList = response;
      yield put({
        type: 'queryFaultSubsystem',
        payload: subFaultList,
      });
    },
    // *fetchCurrentDir({ payload }, { call, put }) {
    //   const currentDir = yield call(queryCurrentDir, payload);
    //   yield put({
    //     type: 'queryCurrentDir',
    //     payload: currentDir,
    //   });
    // },
    // *fetchFaultDistribution({ payload }, { call, put }) {
    //   const FaultDistribution = yield call(queryFaultDistribution, payload);
    //   yield put({
    //     type: 'queryFaultDistribution',
    //     payload: FaultDistribution,
    //   });
    // },
  },

  reducers: {
    getData(state, { payload }) {
      return {
        ...state,
        dataList: payload,
      };
    },
    queryFaultSubsystem(state, { payload }) {
      return {
        ...state,
        subFaultList: payload,
      };
    },
  },
};

export default Model;
