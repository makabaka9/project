import { Effect, Reducer } from 'umi';

import { queryPassengerStatistic, queryPassengerFlowDay, queryPassengerFlowMonth, queryPassengerFlowYear, queryPassengerFlowDayTop5, queryPassengerFlowDayBottom, queryPassengerFlowDayTop5Bottom } from './service';
import moment from 'moment';
import { PassengerFlowDayDataType } from './data';

export interface StateType {
  passengerStatistic: Array<object>;
  passengerFlowDay: PassengerFlowDayDataType;
  // passengerFlowMonth: Array<object>;
  passengerFlowYear: Array<object>;
  passengerFlowDayTop5: Array<{
    time: string,
    keyAndValueList: [
      {
        key: string,
        value: number,
      }
    ]
  }>;
  passengerFlowDayBottom: [{
    passengerVolume: number,
    stationName: string
  }],
  // passengerFlowDayTop5Bottom: [{
  //   key: string,
  //   value: number
  // }];
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetchPassengerStatistic: Effect;
    fetchPassengerFlowDay: Effect;
    // fetchPassengerFlowMonth: Effect;
    fetchPassengerFlowYear: Effect;
    fetchPassengerFlowDayTop5: Effect;
    fetchPassengerFlowDayBottom: Effect;
    // fetchPassengerFlowDayTop5Bottom: Effect;
  };
  reducers: {
    passengerStatistic: Reducer<StateType>;
    passengerFlowDay: Reducer<StateType>;
    // passengerFlowMonth: Reducer<StateType>;
    passengerFlowYear: Reducer<StateType>;
    passengerFlowDayTop5: Reducer<StateType>;
    passengerFlowDayBottom: Reducer<StateType>;
    // passengerFlowDayTop5Bottom: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'statisticsAndPassengerFlow',

  state: {
    passengerStatistic: [],
    // maxPassengerVolume: 1420
    // maxTime: "7:00"
    // minPassengerVolume: 1360
    // minTime: "6:30"
    // timePointList: Array(2)
    // 0: {passengerFlow: 1360, timePoint: "6:30"}
    // 1: {passengerFlow: 1420, timePoint: "7:00"}
    passengerFlowDay: {
      maxPassengerVolume: 0,
      maxTime: '',
      minPassengerVolume: 0,
      minTime: '',
      timePointList: [
        {
          timePoint: '',
          passengerFlow: 0
        }
      ]
    },
    // passengerFlowMonth: [],
    passengerFlowYear: [],
    passengerFlowDayTop5:
      [],
    passengerFlowDayBottom: [
      {
        passengerVolume: 0,
        stationName: "",
      }
    ],
    // passengerFlowDayTop5Bottom: [{
    //   key: "",
    //   value: 0
    // }],
  },

  effects: {
    *fetchPassengerStatistic({ payload }, { call, put }) {
      const response = yield call(queryPassengerStatistic, payload);
      yield put({
        type: 'passengerStatistic',
        payload: response,
      });
    },
    *fetchPassengerFlowDay({ payload }, { call, put }) {
      const response = yield call(queryPassengerFlowDay, payload);
      // console.log("333", response)
      yield put({
        type: 'passengerFlowDay',
        payload: response,
      });
    },
    *fetchPassengerFlowYear({ payload }, { call, put }) {
      const response = yield call(queryPassengerFlowYear, payload);
      // const result = response.map((item) => ({
      //   key: moment(item.key).format("MM"),
      //   value: item.value,
      // }));
      yield put({
        type: 'passengerFlowYear',
        payload: response,
      });
    },
    *fetchPassengerFlowDayTop5({ payload }, { call, put }) {
      const response = yield call(queryPassengerFlowDayTop5, payload);
      yield put({
        type: 'passengerFlowDayTop5',
        payload: response,
      });
    },
    *fetchPassengerFlowDayBottom({ payload }, { call, put }) {
      const response = yield call(queryPassengerFlowDayBottom, payload);
      // const result = response.map((item) => ({
      //   key: moment(item.key).format("MM:ss"),
      //   value: item.value,
      // }));
      yield put({
        type: 'passengerFlowDayBottom',
        payload: response,
      });
    },
    // *fetchPassengerFlowDayTop5Bottom({ payload }, { call, put }) {
    //   const response = yield call(queryPassengerFlowDayTop5Bottom, payload);

    //   yield put({
    //     type: 'passengerFlowDayTop5Bottom',
    //     payload: response,
    //   });
    // },
  },

  reducers: {
    passengerStatistic(state, action) {
      return {
        ...state,
        passengerStatistic: action.payload,
      };
    },
    passengerFlowDay(state, action) {
      return {
        ...state,
        passengerFlowDay: action.payload,
      };
    },
    // passengerFlowMonth(state, action) {
    //   return {
    //     ...state,
    //     passengerFlowMonth: action.payload,
    //   };
    // },
    passengerFlowYear(state, action) {
      return {
        ...state,
        passengerFlowYear: action.payload,
      };
    },
    passengerFlowDayTop5(state, action) {
      return {
        ...state,
        passengerFlowDayTop5: action.payload,
      };
    },
    passengerFlowDayBottom(state, action) {
      return {
        ...state,
        passengerFlowDayBottom: action.payload,
      };
    },
    //   passengerFlowDayTop5Bottom(state, action) {
    //     return {
    //       ...state,
    //       passengerFlowDayTop5Bottom: action.payload,
    //     };
    //   },
  },
};

export default Model;
