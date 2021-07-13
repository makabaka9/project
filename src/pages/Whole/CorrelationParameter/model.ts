import { Effect, Reducer } from 'umi';
import { TrainsMonitorType } from './data';
import { querytrainMonitor } from './service';

export interface StateType {
  train?: TrainsMonitorType;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetchBasic: Effect;
  };
  reducers: {
    show: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'wholeAndCorrelationParameter',

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
  },

  effects: {
    *fetchBasic({ payload }, { call, put }) {
      const response = yield call(querytrainMonitor, payload);
      yield put({
        type: 'show',
        payload: response,
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
  },
};

export default Model;
