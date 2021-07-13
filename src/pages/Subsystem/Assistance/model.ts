import { Effect, Reducer } from 'umi';

import { BatteryVoltageDataType, AuxiliaryStatusDataDataType, FaultPageDataType, FaultHistogramDataType } from './data.d';
import { queryBatteryVoltage, queryAuxiliaryStatusData, queryFaultPie, queryFaultInfo, queryFaultHistogram } from './service';
import moment from 'moment';

export interface StateType {
  batteryVoltage: BatteryVoltageDataType;
  auxiliaryStatusData: AuxiliaryStatusDataDataType
  faultHistogram: FaultHistogramDataType;
  faultPie: Array<object>;
  faultInfo: FaultPageDataType;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetchBatteryVoltage: Effect;
    fetchAuxiliaryStatusData: Effect;
    fetchFaultHistogram: Effect;
    fetchFaultPie: Effect;
    fetchFaultInfo: Effect;
  };
  reducers: {
    batteryVoltage: Reducer<StateType>;
    auxiliaryStatusData: Reducer<StateType>;
    faultHistogram: Reducer<StateType>;
    faultPie: Reducer<StateType>;
    faultInfo: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'subsystemAndAssistance',

  state: {
    batteryVoltage: {
      batteryTemperature: 0,
      batteryVoltage: 0,
    },
    auxiliaryStatusData: {
      chargerSlightFault: 0,
      chargerMediumFault: 0,
      chargerSeriousFault: 0,
      inverterModuleOverTemperature: 0,
      chargerModuleOverTemperature: 0,
      batteryHighTemperatureAlarm: 0,
      batteryLowTemperatureAlarm: 0,
      lowBatteryVoltageYellowWarning: 0,
      inverterShortCircuitContactorKM1: 0,
      inverterChargingContactorKM2: 0,
      inverterOutputContactorKMA: 0,
      variableSpeedFanContactorK12: 0,
      variableSpeedFanContactorK13: 0,
      coolingFanCircuitBreakerStatusSignalK4: 0,
      emergencyPowerOn: 0,
      chargerInputProtectionSwitchQF11: 0,
      chargerKM11Contactor: 0,
      chargerOutputOKFeedback: 0,
      auxiliaryTransformerOutputOKFeedback: 0,
      theOutputOfChargerIsNormal: 0,
      inverterOutputThreePhaseVoltageIsNormal: 0,
      lowBatteryVoltageRedAlarm: 0,
      sivslightFault: 0,
      sivmediumFault: 0,
      sivseriousFault: 0,
      lineInputVoltage: 0,
      inverterInputCurrent: 0,
      outputLineVoltageOfInverterCircuit: 0,
      voltageOfIntermediateCapacitorOfInverter: 0,
      inverterOutputPhaseVoltageU: 0,
      inverterOutputPhaseVoltageV: 0,
      inverterOutputPhaseVoltageW: 0,
      inverterOutputPhaseVoltageA: 0,
      inverterOutputPhaseVoltageC: 0,
      inverterOutputCurrentU: 0,
      inverterOutputCurrentV: 0,
      inverterOutputCurrentW: 0,
      inverterOutputFrequency: 0,
      outputVoltageOfChargerCircuit: 0,
      outputCurrentOfChargerCircuit: 0,
      chargingCurrentOfBatteryOfCharger: 0,
      batteryTemperature: 0,
      inverterModuleTemperature: 0,
      dcvoltageAfterRectifierBridgeInputByCharger: 0,
    },
    faultHistogram: {
      充电机: {},
      应急电源: {},
      蓄电池: {},
      牵引逆变器: {},
    },
    faultPie: [],
    faultInfo: {
      pageList: [],
      countTotal: 0,
    },

  },

  effects: {
    // *fetchBatteryTemperature({ payload }, { call, put }) {
    //   const response = yield call(queryBatteryTemperature, payload);
    //   const result = response.map(item => ({
    //     time: moment(item.time).format("HH"),
    //     // type: item.type,
    //     value: item.value,
    //   }))
    //   yield put({
    //     type: 'batteryTemperature',
    //     payload: result,
    //   });
    // },
    *fetchBatteryVoltage({ payload }, { call, put }) {
      const response = yield call(queryBatteryVoltage, payload);
      yield put({
        type: 'batteryVoltage',
        payload: response,
      });
    },
    *fetchAuxiliaryStatusData({ payload }, { call, put }) {
      const response = yield call(queryAuxiliaryStatusData, payload);
      yield put({
        type: 'auxiliaryStatusData',
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
    batteryTemperature(state, action) {
      return {
        ...state,
        batteryTemperature: action.payload,
      };
    },
    batteryVoltage(state, action) {
      return {
        ...state,
        batteryVoltage: action.payload,
      };
    },
    auxiliaryStatusData(state, action) {
      return {
        ...state,
        auxiliaryStatusData: action.payload,
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
