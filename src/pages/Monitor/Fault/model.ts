import { Effect, Reducer } from 'umi';

import { BasicProfileDataType } from './data';
import { queryTrainList } from './service';

export interface StateType {
  list: BasicProfileDataType[];
  // trainID?: Array<string>;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetch: Effect;
    // fetchTrainID: Effect;
  };
  reducers: {
    queryList: Reducer<StateType>;
    // queryTrainID: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'monitorAndFault',

  state: {
    list: [
      {
        id: undefined,
        trainCode: '',
        faultType: '',
        faultNum: 0
      },
    ],
    // trainID: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryTrainList, payload);
      const faultList = {};
      response.forEach(element =>{
        if(typeof faultList[element.trainCode]==="undefined"){
          faultList[element.trainCode] = {};
          faultList[element.trainCode].trainCode = element.trainCode;
        }
        faultList[element.trainCode][element.faultType]=element.faultNum
      });
      yield put({
        type: 'queryList',
        payload: Array.from(Object.values(faultList)),
      });
    },
    // *fetchTrainID({ payload }, { call, put }) {
    //   const response = yield call(queryTrainList, payload);
    //   const trainID = response.result.map((item) => ({
    //     title: item.trainCode,
    //     value: item.trainCode,
    //   }));
    //   yield put({
    //     type: 'queryTrainID',
    //     payload: trainID,
    //   });
    // },
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    // queryTrainID(state, action) {
    //   return {
    //     ...state,
    //     trainID: action.payload,
    //   };
    // },
  },
};

export default Model;
