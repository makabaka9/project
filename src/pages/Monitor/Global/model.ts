import { Effect, Reducer } from 'umi';
import { SearchDataType, SysListType, TopTenData, subFaultType ,BasicProfileDataType} from './data.d';
import {
  queryTrainList,
  querySysList,
  queryTarget,
  queryFaultstatistics,
  queryFaultSubsystem,
  queryCurrentDir,
  queryFaultRate,
  queryReliability,
  stateInformation
} from './service';
// import { queryReliability } from '../HMI/service';

export interface StateType {
  dataList?: Array<SearchDataType>;
  sysList?: Array<SysListType>;
  targetList?: Array<{
    month?: string;
    city?: string;
    temperature?: number;
  }>;
  faultList?: Array<TopTenData>;
  subFaultList?: Array<subFaultType>;
  currentDir?: {
    totalTrain: number;
    onLineTrain: number;
    millionMeter: number;
    upDirection?: Array<number>;
    downDirection?: Array<number>;
  };
  faultDistribution?:[];
  faultRate?:[];
  reliability?:[];
  stateList: Array<BasicProfileDataType>;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetch: Effect;
    fetchSysList: Effect;
    fetchTarget: Effect;
    fetchFaultstatistics: Effect;
    fetchFaultSubsystem: Effect;
    fetchCurrentDir: Effect;
    fetchFaultDistribution: Effect;
    fetchFaultRate: Effect;
    fetchReliability: Effect;
    fetchState:Effect;
  };
  reducers: {
    getData: Reducer<StateType>;
    querySysList: Reducer<StateType>;
    queryTarget: Reducer<StateType>;
    queryFaultstatistics: Reducer<StateType>;
    queryFaultSubsystem: Reducer<StateType>;
    queryCurrentDir: Reducer<StateType>;
    queryFaultDistribution: Reducer<StateType>;
    queryFaultRate: Reducer<StateType>;
    queryReliability: Reducer<StateType>;
    queryState:Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'monitorAndGlobal',

  state: {
    dataList: [],
    sysList: [],
    targetList: [],
    faultList: [],
    subFaultList: [],
    faultDistribution: [],
    faultRate:[],
    reliability:[],
    stateList:[]
  },

  effects: {
    *fetch({ }, { call, put }) {
      const dataList = yield call(queryTrainList);

      yield put({
        type: 'getData',
        payload: dataList,
      });
    },
    *fetchSysList({ }, { call, put }) {
      const sysList = yield call(querySysList);
      // const sysList = response;
      yield put({
        type: 'querySysList',
        payload: sysList,
      });
    },
    *fetchFaultstatistics({ }, { call, put }) {
      const faultList = yield call(queryFaultstatistics);
      // const faultList = response;
      yield put({
        type: 'queryFaultstatistics',
        payload: faultList,
      });
    },
    *fetchFaultSubsystem({ }, { call, put }) {
      const subFaultList = yield call(queryFaultSubsystem);
      // const subFaultList = response;
      yield put({
        type: 'queryFaultSubsystem',
        payload: subFaultList,
      });
    },
    *fetchFaultRate({ }, { call, put }) {
      const faultRateList = yield call(queryFaultRate);
      yield put({
        type: 'queryFaultRate',
        payload: faultRateList,
      });
    },
    *fetchReliability({ }, { call, put }) {
      const reliabilityList = yield call(queryReliability);
      // console.log(reliabilityList);
      yield put({
        type: 'queryReliability',
        payload: reliabilityList,
      });
    },
    *fetchMapInformation({ }, { call, put }) {
      const mapInformation = yield call(queryMapInformation);
      // console.log('mapInformation', mapInformation);
      yield put({
        type: 'queryMapInformation',
        payload: mapInformation,
      });
    },
    // *fetchCurrentDir({ payload }, { call, put }) {
    //   const currentDir = yield call(queryCurrentDir, payload);
    //   yield put({
    //     type: 'queryCurrentDir',
    //     payload: currentDir,
    //   });
    // },
    // *fetchFaultDistribution({ payload }, { call, put }) {
    //   const FaultDistribution = yield call(queryFaultDistribution, payload);
    //   yield put({
    //     type: 'queryFaultDistribution',
    //     payload: FaultDistribution,
    //   });
    // },
    *fetchState({ payload }, { call, put }) {
      const response = yield call(stateInformation, payload);
      yield put({
        type: 'queryState',
        payload: response,
      });
    },
  },

  reducers: {
    getData(state, { payload }) {
      return {
        ...state,
        dataList: payload,
      };
    },
    querySysList(state, { payload }) {
      return {
        ...state,
        sysList: payload,
      };
    },
    queryTarget(state, { payload }) {
      return {
        ...state,
        targetList: payload,
      };
    },
    queryFaultstatistics(state, { payload }) {
      return {
        ...state,
        faultList: payload,
      };
    },
    queryFaultSubsystem(state, { payload }) {
      return {
        ...state,
        subFaultList: payload,
      };
    },
    queryCurrentDir(state, { payload }) {
      return {
        ...state,
        currentDir: payload,
      };
    },
    queryFaultDistribution(state, { payload }) {
      return {
        ...state,
        faultDistribution: payload,
      };
    },
    queryFaultRate(state, { payload }) {
      return {
        ...state,
        faultRate: payload,
      };
    },
    queryReliability(state, { payload }) {
      return {
        ...state,
        reliability: payload,
      };
    },
    queryState(state, { payload }) {
      return {
        ...state,
        stateList: payload,
      };
    },
  },
};

export default Model;
