import { Effect, Reducer } from 'umi';

import { SiteStatusDataType, TotalSpeedTimeDataType } from './data.d';
import { queryTotalSpeedTime, querySiteStatus, querySiteSpeedTime } from './service';

export interface StateType {
  totalSpeedTime: TotalSpeedTimeDataType;
  siteSpeedTime: Array<object>;
  siteStatus: Array<object>;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetchTotalSpeedTime: Effect;
    fetchSiteSpeedTime: Effect;
    fetchSiteStatus: Effect;
  };
  reducers: {
    totalSpeedTime: Reducer<StateType>;
    siteSpeedTime: Reducer<StateType>;
    siteStatus: Reducer<StateType>;
  };
}


const Model: ModelType = {
  namespace: 'statisticsAndTravelSpeed',
  state: {
    totalSpeedTime: {
      upTotalAverageTime: 0,
      upTotalAverageSpeed: 0,
      downTotalAverageTime: 0,
      downTotalAverageSpeed: 0,
    },
    siteSpeedTime: [{
      upSpeed: 0,
      upRunTime: 0,
      downRunTime: 0,
      downSpeed: 0,
      siteName: ""
    }],
    // siteStatus:
    //   [{
    //     upSpeed: 0,
    //     upRunTime: 0,
    //     upStopTime: 0,
    //     downSpeed: 0,
    //     stationName: "",
    //     downRunTime: 0,
    //     downStopTime: 0,
    //     statistcsTime: "",
    //     useRate: 0
    //   }],
    siteStatus: []
  },

  effects: {
    *fetchTotalSpeedTime({ payload }, { call, put }) {
      const response = yield call(queryTotalSpeedTime, payload);
      yield put({
        type: 'totalSpeedTime',
        payload: response,
      });
    },
    *fetchSiteSpeedTime({ payload }, { call, put }) {
      const response = yield call(querySiteSpeedTime, payload);
      // console.log("777", response)
      yield put({
        type: 'siteSpeedTime',
        payload: response,
      });
    },

    *fetchSiteStatus({ payload }, { call, put }) {
      const response = yield call(querySiteStatus, payload);
      // console.log("777", response)
      yield put({
        type: 'siteStatus',
        payload: response,
      });
    },
  },

  reducers: {
    totalSpeedTime(state, action) {
      return {
        ...state,
        totalSpeedTime: action.payload,
      };
    },
    siteSpeedTime(state, action) {
      return {
        ...state,
        siteSpeedTime: action.payload,
      };
    },
    siteStatus(state, action) {
      return {
        ...state,
        siteStatus: action.payload,
      };
    },
  },
};

export default Model;
