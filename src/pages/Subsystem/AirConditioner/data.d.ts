export interface MonitorDataType {
  indoorFire: number;
  outDoorFire: number;
  downTime: number;
  localControl: number;
  setPoint: number;
  automaticMode: number;
  ventilation: number;
  strongWind: number;
  precooling: number;
  lighteningMode: number;
  emergencyVentilation: number;
  unit1Ventilator1Up: number;
  unit1Ventilator2Up: number;
  unit1Condenser1Up: number;
  unit1Condenser2Up: number;
  unit1Compressor1Up: number;
  unit1Compressor2Up: number;
  unit1AirValveDown: number;
  unit2Ventilator1Up: number;
  unit2Ventilator2Up: number;
  unit2Condenser1Up: number;
  unit2Condenser2Up: number;
  unit2Compressor1Up: number;
  unit2Compressor2Up: number;
  unit2AirValveDown: number;
  setTemperature: number,
  inTemperature: number,
  outTemperature: number,
  unit1EnergyConsumption: number,
  unit2EnergyConsumption: number,
}

export interface TemperatureEnergyDataType {
  insideTemperature: number
  unitEnergyConsumption1: number
  unitEnergyConsumption2: number
}

export interface FaultPageDtoDataType {
  pageList: [];
  countTotal: number;
}