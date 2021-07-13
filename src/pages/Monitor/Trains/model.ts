import { Effect, Reducer } from 'umi';
import { TrainsMonitorType,TrainBasicInfoType,ImportantParams } from './data.d';
import { querytrainMonitor,querytrainBasicInfo,querytrainImportantStatus } from './service';

export interface StateType {
  train?: TrainsMonitorType;
  trainBasicList?:TrainBasicInfoType;
  trainImportantList?:ImportantParams;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetchBasic: Effect;
    fetchTrainBasic: Effect;
    fetchTrainImportant: Effect;
  };
  reducers: {
    show: Reducer<StateType>;
    queryTrainBasic:Reducer<StateType>;
    queryTrainImportant:Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'monitorAndTrains',

  state: {
    train: {
      trainCode: '',
      runState: -1,
      trainWorkCondition: -1,
      trainSpeed: -1,
      currentStation: '',
      nextStation: '',
      totalMiles: 0,
      track: -1,
      brake: -1,
      fastTrack: -1,
      keepBrakeRelieve: -1,
      direction: -1,
      driverCab: -1,
    },
    trainBasicList:{},
    trainImportantList:{}
  },

  effects: {
    *fetchBasic({ payload }, { call, put }) {
      const response = yield call(querytrainMonitor, payload);
      yield put({
        type: 'show',
        payload: response,
      });
    },
    *fetchTrainBasic({ payload }, { call, put }) {
      const trainBasicList = yield call(querytrainBasicInfo, payload);
      yield put({
        type: 'queryTrainBasic',
        payload: trainBasicList,
      });
    },
    *fetchTrainImportant({ payload }, { call, put }) {
      const trainImportantList = yield call(querytrainImportantStatus, payload);
      yield put({
        type: 'queryTrainImportant',
        payload: trainImportantList,
      });
    },
  },

  reducers: {
    show(state, { payload }) {
      return {
        ...state,
        train: payload,
      };
    },
    queryTrainBasic(state, { payload }) {
      return {
        ...state,
        trainBasicList: payload,
      };
    },
    queryTrainImportant(state, { payload }) {
      return {
        ...state,
        trainImportantList: payload,
      };
    },
  },
};

export default Model;
