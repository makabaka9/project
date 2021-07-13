import { Effect, Reducer } from 'umi';

import { BrakingForceDataType, BrakeOperationStatusMonitoringDataType, FaultPageDataType } from './data.d';
import { queryBrakingForce, queryBrakeOperationStatusMonitoring, queryFaultPie, queryFaultInfo, queryFaultHistogram } from './service';
import moment from 'moment';

export interface StateType {
  brakingForce: BrakingForceDataType;
  brakeOperationStatusMonitoring: BrakeOperationStatusMonitoringDataType;
  faultHistogram: Array<object>;
  faultPie: Array<object>;
  faultInfo: FaultPageDataType;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetchBrakingForce: Effect;
    fetchBrakeOperationStatusMonitoring: Effect;
    fetchFaultHistogram: Effect;
    fetchFaultPie: Effect;
    fetchFaultInfo: Effect;
  };
  reducers: {
    brakingForce: Reducer<StateType>;
    brakeOperationStatusMonitoring: Reducer<StateType>;
    faultHistogram: Reducer<StateType>;
    faultPie: Reducer<StateType>;
    faultInfo: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'subsystemAndBrake',

  state: {
    brakingForce: {
      electricBrakingCapacity: 0,
      actualElectricBrakingCapacity: 0
    },
    brakeOperationStatusMonitoring: {
      braking: 0,
      electricBrakingCapacity: 0,
      actualElectricBrakingForce: 0,
      quickBraking: 0,
      holdBrakeRelease: 0,
      electricBrakeAvailable: 0,
      electricBrakingIsEffective: 0,
      electricBrakingSliding: 0,
      electricBrakingAttenuation: 0,
      frameSliding1: 0,
      frameEmergencyBrakeApplication1: 0,
      frameBrakeReleased1: 0,
      lowPressureOfBrakeAirCylinderOfFrame1: 0,
      frameAirBrakeStatus1: 0,
      frameSliding2: 0,
      frameEmergencyBrakeApplication2: 0,
      frameBrakeReleased2: 0,
      lowPressureOfBrakeAirCylinderOfFrame2: 0,
      frameAirBrakeStatus2: 0,
      brakeFrameAirCylinderPressure1: 0,
      actualBrakingForceOfFrame1: 0,
      frameBrakeCylinderPressure1: 0,
      airBrakeCapacityOfFrame1: 0,
      frame1AirSpring1Pressure: 0,
      frame1AirSpring2Pressure: 0,
      brakeFrameAirCylinderPressure2: 0,
      actualBrakingForceOfFrame2: 0,
      frameBrakeCylinderPressure2: 0,
      airBrakeCapacityOfFrame2: 0,
      frame2AirSpring1Pressure: 0,
      frame2AirSpring2Pressure: 0,
      axialSpeed1: 0,
      axialSpeed2: 0,
      axialSpeed3: 0,
      axialSpeed4: 0,
    },
    faultHistogram: [],
    faultPie: [],
    faultInfo: {
      pageList: [],
      countTotal: 0,
    },
  },

  effects: {
    *fetchBrakingForce({ payload }, { call, put }) {
      const response = yield call(queryBrakingForce, payload);
      yield put({
        type: 'brakingForce',
        payload: response,
      });
    },
    *fetchBrakeOperationStatusMonitoring({ payload }, { call, put }) {
      const response = yield call(queryBrakeOperationStatusMonitoring, payload);
      yield put({
        type: 'brakeOperationStatusMonitoring',
        payload: response,
      });
    },
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
    brakingForce(state, action) {
      return {
        ...state,
        brakingForce: action.payload,
      };
    },
    brakeOperationStatusMonitoring(state, action) {
      return {
        ...state,
        brakeOperationStatusMonitoring: action.payload,
      };
    },
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
