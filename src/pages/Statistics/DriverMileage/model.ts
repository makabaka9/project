import moment from 'moment';
import { Effect, Reducer } from 'umi';
import { queryMileData, queryMileYearData, queryMileToprData, queryMileListrData } from './service';

export interface StateType {
  dataList?: {
    lineTotalMiles: number,
    lineMonthMiles: number,
    lineDayMiles: number,
    trainMaxMonthMiles: number
  },
  mileYearData?: Array<Object>,
  mileToprData?: Array<Object>,
  mileListrData?: Array<Object>,
}
export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetchMileData: Effect;
    fetchMileYearData: Effect;
    fetchMileToprData: Effect;
    fetchMileListrData: Effect;
  };
  reducers: {
    queryMileData: Reducer<StateType>
    queryMileYearData: Reducer<StateType>
    queryMileToprData: Reducer<StateType>
    queryMileListrData: Reducer<StateType>
  };
}


const Model: ModelType = {
  namespace: 'driverAndMileage',

  state: {
    dataList: {
      lineTotalMiles: 0,
      lineMonthMiles: 0,
      lineDayMiles: 0,
      trainMaxMonthMiles: 0
    },
    mileYearData: [],
    mileToprData: [],
    mileListrData: []
  },

  effects: {
    *fetchMileData({ payload }, { call, put }) {
      const dataList = yield call(queryMileData, payload);
      yield put({
        type: 'queryMileData',
        payload: dataList
      });
    },
    *fetchMileYearData({ payload }, { call, put }) {
      const response = yield call(queryMileYearData, payload);
      const mileYearData = response.map((item: any) => ({
        key: moment(item.key).format("YYYY-MM"),
        value: item.value,
      }));
      yield put({
        type: 'queryMileYearData',
        payload: mileYearData
      });
    },
    *fetchMileToprData({ payload }, { call, put }) {
      const mileToprData = yield call(queryMileToprData, payload);
      yield put({
        type: 'queryMileToprData',
        payload: mileToprData
      });
    },
    *fetchMileListrData({ payload }, { call, put }) {
      const mileListrData = yield call(queryMileListrData, payload);
      yield put({
        type: 'queryMileListrData',
        payload: mileListrData
      });
    },
  },

  reducers: {
    queryMileData(state, { payload }) {
      return {
        ...state,
        dataList: payload,
      };
    },
    queryMileYearData(state, { payload }) {
      return {
        ...state,
        mileYearData: payload,
      };
    },
    queryMileToprData(state, { payload }) {
      return {
        ...state,
        mileToprData: payload,
      };
    },
    queryMileListrData(state, { payload }) {
      return {
        ...state,
        mileListrData: payload,
      };
    },
  },
};

export default Model;
