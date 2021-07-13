import { Effect, Reducer } from 'umi';
import { BasicProfileDataType } from './data.d';
import { stateInformation } from './service';

export interface StateType {
  listState: Array<BasicProfileDataType>;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetch: Effect;
  };
  reducers: {
    queryList: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'monitorAndState',
  state: {
    listState: [{
      trainCode: ' ',
      currentStation: ' ',
      nextStation: ' ',
      stateTime: ' ',
      state: -1,
      speedPerHour: 0,
      faultNum: 0,
      // workCondition: ' ',
      direction: ' ',
    }],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(stateInformation, payload);
      yield put({
        type: 'queryList',
        payload: response,
      });
    },
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        listState: action.payload,
      };
    },
  },
};

export default Model;
