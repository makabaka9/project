import moment from 'moment';
import { Effect, Reducer } from 'umi';

import { OperationStatusMonitoringDataType, OperationStatusDataType, TractionStateParametersDataType, FaultHistogramDataType, FaultPageDataType } from './data.d';
import { queryOperationStatusMonitoring, queryOperationStatus, queryTractionStateParameters, queryFaultHistogram, queryFaultPie, queryFaultInfo } from './service';

export interface StateType {
  operationStatusMonitoring: OperationStatusMonitoringDataType;
  operationStatus: OperationStatusDataType;
  tractionStateParameters: TractionStateParametersDataType;
  faultHistogram: FaultHistogramDataType;
  faultPie: Array<object>;
  faultInfo: FaultPageDataType;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetchOperationStatusMonitoring: Effect;
    fetchOperationStatus: Effect;
    fetchTractionStateParameters: Effect;
    fetchFaultHistogram: Effect;
    fetchFaultPie: Effect;
    fetchFaultInfo: Effect;
  };
  reducers: {
    operationStatusMonitoring: Reducer<StateType>;
    operationStatus: Reducer<StateType>;
    tractionStateParameters: Reducer<StateType>;
    faultHistogram: Reducer<StateType>;
    faultPie: Reducer<StateType>;
    faultInfo: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'subsystemAndTraction',

  state: {
    operationStatusMonitoring: {
      motorTemperature1: 0,
      motorTemperature2: 0,
      motorTemperature3: 0,
      motorTemperature4: 0,
      inverterCurrent: 0,
      intermediateVoltage: 0,
      intermediateCurrent: 0,
      givenTraction: 0,
      actualTraction: 0
    },
    operationStatus: {
      motorTemperature: [],
      intermediateVoltage: [],
      inverterCurrent: [],
      intermediateCurrent: [],
    },

    tractionStateParameters: {
      tow: 0,
      startingOfTractionInverter: 0,
      tractionInverterIdling: 0,
      electricBrakingOfTractionInverter: 0,
      highSpeedCircuitBreakerClosed: 0,
      chargingContactorClosed: 0,
      shortCircuitContactorClosed: 0,
      electricBrakeAvailable: 0,
      electricBrakingAttenuation: 0,
      electricBrakingSliding: 0,
      intermediateVoltage: 0,
      intermediateCurrent: 0,
      gridVoltage: 0,
      inverterCurrent: 0,
      comprehensiveSpeedOfMotor: 0,
      chopTime: 0,
      chopCurrent1: 0,
      chopCurrent2: 0,
      motorTemperature1: 0,
      motorTemperature2: 0,
      motorTemperature3: 0,
      motorTemperature4: 0,
      tractionPower: 0,
      trainActualElectricBrakingForce: 0,
      trainTraction: 0,
      trainElectricBrakingCapacity: 0
    },
    faultHistogram: {
      电机温度传感器: {},
      VVVF牵引逆变器: {},
      短接接触器: {},
      电压传感器: {},
      高速断路器: {},
      制动电阻: {},
      充电接触器: {},
    },
    faultPie: [],
    faultInfo: {
      pageList: [],
      countTotal: 0,
    },
  },

  effects: {
    *fetchOperationStatusMonitoring({ payload }, { call, put }) {
      const response = yield call(queryOperationStatusMonitoring, payload);
      const result = response.map(item => ({
        time: moment(item.time).format("HH"),
        type: item.type,
        value: item.value,
      }))


      yield put({
        type: 'operationStatusMonitoring',
        payload: result,
      });
    },
    *fetchOperationStatus({ payload }, { call, put }) {
      const response = yield call(queryOperationStatus, payload);
      yield put({
        type: 'operationStatus',
        payload: response,
      });
    },
    *fetchTractionStateParameters({ payload }, { call, put }) {
      const response = yield call(queryTractionStateParameters, payload);
      // console.log("tractionStateParameters", tractionStateParameters)
      yield put({
        type: 'tractionStateParameters',
        payload: response,
      });
    },
    // *fetchTractionCurrentAndVoltageParameters({ payload }, { call, put }) {
    //   const response = yield call(queryTractionStateParameters, payload);
    //   const tractionCurrentAndVoltageParameters = response.TractionCurrentAndVoltageParameters
    //   // console.log("tractionCurrentAndVoltageParameters", tractionCurrentAndVoltageParameters)
    //   yield put({
    //     type: 'tractionCurrentAndVoltageParameters',
    //     payload: tractionCurrentAndVoltageParameters,
    //   });
    // },
    *fetchFaultHistogram({ payload }, { call, put }) {
      const response = yield call(queryFaultHistogram, payload);
      yield put({
        type: 'faultHistogram',
        payload: response,
      });
    },
    *fetchFaultPie({ payload }, { call, put }) {
      const response = yield call(queryFaultPie, payload);
      yield put({
        type: 'faultPie',
        payload: response,
      });
    },
    *fetchFaultInfo({ payload }, { call, put }) {
      const response = yield call(queryFaultInfo, payload);
      yield put({
        type: 'faultInfo',
        payload: response,
      });
    },
  },

  reducers: {
    operationStatusMonitoring(state, action) {
      return {
        ...state,
        operationStatusMonitoring: action.payload,
      };
    },
    operationStatus(state, action) {
      return {
        ...state,
        operationStatus: action.payload,
      };
    },
    tractionStateParameters(state, action) {
      return {
        ...state,
        tractionStateParameters: action.payload
      };
    },
    // tractionCurrentAndVoltageParameters(state, action) {
    //   return {
    //     ...state,
    //     tractionCurrentAndVoltageParameters: action.payload
    //   };
    // },
    faultHistogram(state, action) {
      return {
        ...state,
        faultHistogram: action.payload,
      };
    },
    faultPie(state, action) {
      return {
        ...state,
        faultPie: action.payload,
      };
    },
    faultInfo(state, action) {
      return {
        ...state,
        faultInfo: action.payload
      };
    },
  },
};

export default Model;
