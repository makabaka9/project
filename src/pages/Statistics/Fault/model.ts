import { Effect, Reducer } from 'umi';

import { SystemNameDataType, FaultSystemDataType, FaultDistributionDataType, TripFaultDataType } from './data.d';
import { queryFaultDistribution, queryFaultTrend, querySystemName, queryTripFault, queryFaultSystem } from './service';

export interface StateType {
  faultSystemList?: Array<FaultSystemDataType>;
  systemNameList?: {};
  faultDistributionList?: Array<FaultDistributionDataType>;
  tripFaultList?: Array<TripFaultDataType>;
  faultTrendList?: Array<Object>
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetchFaultSystem: Effect;
    fetchSystemName: Effect;
    fetchFaultDistribution: Effect;
    fetchTripFault: Effect;
    fetchFaultTrend: Effect;
  };
  reducers: {
    queryFaultSystem: Reducer<StateType>;
    querySystemName: Reducer<StateType>;
    queryFaultDistribution: Reducer<StateType>;
    queryTripFault: Reducer<StateType>;
    queryFaultTrend: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'statisticsAndFault',

  state: {
    faultSystemList: [],
    systemNameList: [],
    faultDistributionList: [],
    tripFaultList: [],
    faultTrendList: []
  },

  effects: {
    *fetchFaultSystem({ payload }, { call, put }) {
      const faultSystemList = yield call(queryFaultSystem, payload);
      yield put({
        type: 'queryFaultSystem',
        payload: faultSystemList,
      });
    },
    *fetchFaultTrend({ payload }, { call, put }) {
      const faultTrendList = yield call(queryFaultTrend, payload);
      yield put({
        type: 'queryFaultTrend',
        payload: faultTrendList,
      });
    },
    *fetchSystemName({ payload }, { call, put }) {
      const systemNameList = yield call(querySystemName, payload);
      // 各子系统故障分布数据
      // const childrendata = systemNamedata.map((item: { systemName: any; faultNum: any; }) => ({
      //   name: item.systemName,
      //   value: item.faultNum,
      // }))
      // const systemNameList = {
      //   name: 'root',
      //   children: childrendata
      // }
      yield put({
        type: 'querySystemName',
        payload: systemNameList,
      });
    },
    *fetchFaultDistribution({ payload }, { call, put }) {
      const faultDistributionList = yield call(queryFaultDistribution, payload);
      yield put({
        type: 'queryFaultDistribution',
        payload: faultDistributionList,
      });
    },
    *fetchTripFault({ payload }, { call, put }) {
      const tripFaultData = yield call(queryTripFault, payload);
      // 各车次故障统计数据
      const childrendata = tripFaultData.map((item: { trainCode: any; faultNum: any; }) => ({
        name: item.trainCode,
        value: item.faultNum,
      }))
      const tripFaultList = {
        name: 'root',
        children: childrendata
      }
      yield put({
        type: 'queryTripFault',
        payload: tripFaultList,
      });
    },

  },

  reducers: {
    queryFaultSystem(state, { payload }) {
      return {
        ...state,
        faultSystemList: payload,
      };
    },
    queryFaultTrend(state, { payload }) {
      return {
        ...state,
        faultTrendList: payload,
      };
    },
    querySystemName(state, { payload }) {
      return {
        ...state,
        systemNameList: payload,
      };
    },
    queryFaultDistribution(state, { payload }) {
      return {
        ...state,
        faultDistributionList: payload,
      };
    },
    queryTripFault(state, { payload }) {
      return {
        ...state,
        tripFaultList: payload,
      };
    },

  },
};

export default Model;
