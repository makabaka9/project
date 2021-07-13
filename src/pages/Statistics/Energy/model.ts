import { Effect, Reducer } from 'umi';

import { EnergyStatisticsDay } from './data';
import { querytrainEnergy } from './service';

export interface StateType {
  energyList?: EnergyStatisticsDay;
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
  namespace: 'energyTrain',

  state: {
    energyList: {
      monthData:[],
      dayData:[],
      energyInfo:[]
    }
  },

  effects: {
    *fetchBasic({ payload }, { call, put }) {
      const energyList = yield call(querytrainEnergy, payload);
      // console.log('energyList',energyList);
      yield put({
        type: 'show',
        payload: energyList
      });
    },
  },

  reducers: {
    show(state, { payload }) {
      return {
        ...state,
        energyList: payload,
      };
    },
  },
};

export default Model;
