import { Effect, Reducer } from 'umi';

import { BasicProfileDataType } from './data.d';
import { queryTrainList } from './service';

export interface StateType {
  list: BasicProfileDataType[];
  trainID?: Array<string>;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetch: Effect;
    fetchTrainID: Effect;
  };
  reducers: {
    queryList: Reducer<StateType>;
    queryTrainID: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'subsystemAndState',

  state: {
    list: [
      {
        trainCode: '',
        trainNumberCode: '',
        trainAscription: '',
        longitude: '',
        latitude: '',
        time: '',
        tractionEnergy: 0,
        regenerationEnergy: 0,
        operatingState: 0,
        trainTemperature: 0,
        speed: 0,
        mile: 0,
        faultNum: 0,
      },
    ],
    trainID: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryTrainList, payload);
      yield put({
        type: 'queryList',
        payload: response.result,
      });
    },
    *fetchTrainID({ payload }, { call, put }) {
      const response = yield call(queryTrainList, payload);
      const trainID = response.result.map((item) => ({
        title: item.trainCode,
        value: item.trainCode,
      }));
      yield put({
        type: 'queryTrainID',
        payload: trainID,
      });
    },
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    queryTrainID(state, action) {
      return {
        ...state,
        trainID: action.payload,
      };
    },
  },
};

export default Model;
