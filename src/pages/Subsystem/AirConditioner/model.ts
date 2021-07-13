import { Effect, Reducer } from 'umi';
import { queryMonitor, queryTemperatureEnergy, queryFaultNumber, queryFaultInfo } from './service';
import { TemperatureEnergyDataType, MonitorDataType, FaultPageDtoDataType } from './data';
import moment from 'moment';

export interface StateType {
  monitor: MonitorDataType;
  temperatureEnergy: TemperatureEnergyDataType;
  faultNumber: Array<object>;
  faultInfo: FaultPageDtoDataType;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetchMonitor: Effect;
    fetchTemperatureEnergy: Effect;
    fetchFaultNumber: Effect;
    fetchFaultInfo: Effect;

  };
  reducers: {
    monitor: Reducer<StateType>;
    temperatureEnergy: Reducer<StateType>;
    faultNumber: Reducer<StateType>;
    faultInfo: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'subsystemAndAirConditioner',
  state: {
    monitor: {
      indoorFire: 0,
      outDoorFire: 0,
      downTime: 0,
      localControl: 0,
      setPoint: 0,
      automaticMode: 0,
      ventilation: 0,
      strongWind: 0,
      precooling: 0,
      lighteningMode: 0,
      emergencyVentilation: 0,
      unit1Ventilator1Up: 0,
      unit1Ventilator2Up: 0,
      unit1Condenser1Up: 0,
      unit1Condenser2Up: 0,
      unit1Compressor1Up: 0,
      unit1Compressor2Up: 0,
      unit1AirValveDown: 0,
      unit2Ventilator1Up: 0,
      unit2Ventilator2Up: 0,
      unit2Condenser1Up: 0,
      unit2Condenser2Up: 0,
      unit2Compressor1Up: 0,
      unit2Compressor2Up: 0,
      unit2AirValveDown: 0,
      setTemperature: 0,
      inTemperature: 0,
      outTemperature: 0,
      unit1EnergyConsumption: 0,
      unit2EnergyConsumption: 0,
    },
    temperatureEnergy: {
      insideTemperature: 0,
      unitEnergyConsumption1: 0,
      unitEnergyConsumption2: 0
    },
    faultNumber: [],
    faultInfo: {
      pageList: [],
      countTotal: 0,
    },
  },

  effects: {
    * fetchMonitor({ payload }, { call, put }) {
      const response = yield call(queryMonitor, payload);
      yield put({
        type: 'monitor',
        payload: response,
      });
    },

    * fetchTemperatureEnergy({ payload }, { call, put }) {
      const response = yield call(queryTemperatureEnergy, payload);
      // const result = response.map((item) => ({
      //   time: moment(item.time).format("YYYY-MM-DD HH:SS"),
      //   type: item.type,
      //   value: item.value,
      // }));
      // console.log("4444", result)
      yield put({
        type: 'temperatureEnergy',
        payload: response,
      });
    },

    * fetchFaultNumber({ payload }, { call, put }) {
      const response = yield call(queryFaultNumber, payload);
      yield put({
        type: 'faultNumber',
        payload: response,
      });
    },

    * fetchFaultInfo({ payload }, { call, put }) {
      const response = yield call(queryFaultInfo, payload);
      yield put({
        type: 'faultInfo',
        payload: response,
      });
    },
  },

  reducers: {
    monitor(state, action) {
      return {
        ...state,
        monitor: action.payload,
      };
    },

    temperatureEnergy(state, action) {
      return {
        ...state,
        temperatureEnergy: action.payload,
      };
    },

    faultNumber(state, action) {
      return {
        ...state,
        faultNumber: action.payload,
      };
    },
    faultInfo(state, action) {
      return {
        ...state,
        faultInfo: action.payload,
      };
    },
  },
};

export default Model;
