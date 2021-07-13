import { Effect, Reducer } from 'umi';
import { TrainsMonitorType, TrainBasicInfoType, ImportantParams } from './data.d';
import { querytrainMonitor, querytrainBasicInfo, querytrainImportantStatus, queryImportant, queryCheshi } from './service';

export interface StateType {
  important?: any;
  cheshi: any;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetchImportant: Effect;
    fetchCheshi: Effect;

  };
  reducers: {
    queryImportant: Reducer<StateType>;
    queryCheshi: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'monitorAndTrains1',

  state: {
    important: {},
    cheshi: {}
  },

  effects: {
    *fetchImportant({ }, { call, put }) {
      const important = yield call(queryImportant);
      yield put({
        type: 'queryImportant',
        payload: important,
      });
    },
    *fetchCheshi({ }, { call, put }) {
      const cheshi = yield call(queryCheshi);
      yield put({
        type: 'queryCheshi',
        payload: cheshi,
      });
    },
  },

  reducers: {

    queryImportant(state, { payload }) {
      return {
        ...state,
        important: payload,
      };
    },
    queryCheshi(state, { payload }) {
      return {
        ...state,
        cheshi: payload,
      };
    },
  },
};

export default Model;
