export interface BasicGood {
  id: string;
  name?: string;
  barcode?: string;
  price?: string;
  num?: string | number;
  amount?: string | number;
}

export interface BasicProgress {
  key: string;
  time: string;
  rate: string;
  status: string;
  operator: string;
  cost: string;
}

export interface BasicProfileDataType {
  basicGoods: BasicGood[];
  basicProgress: BasicProgress[];
}

export interface DoubleLine {
  time: Date;
  type: string;
  value: number;
}
// export interface BatteryTemperatureDataType {
//   temperature: DoubleLine[];
// }
export interface BatteryVoltageDataType {
  batteryTemperature: number;
  batteryVoltage: number;
}

export interface AuxiliaryStatusDataDataType {
  chargerSlightFault: number;
  chargerMediumFault: number;
  chargerSeriousFault: number;
  inverterModuleOverTemperature: number;
  chargerModuleOverTemperature: number;
  batteryHighTemperatureAlarm: number;
  batteryLowTemperatureAlarm: number;
  lowBatteryVoltageYellowWarning: number;
  inverterShortCircuitContactorKM1: number;
  inverterChargingContactorKM2: number;
  inverterOutputContactorKMA: number;
  variableSpeedFanContactorK12: number;
  variableSpeedFanContactorK13: number;
  coolingFanCircuitBreakerStatusSignalK4: number;
  emergencyPowerOn: number;
  chargerInputProtectionSwitchQF11: number;
  chargerKM11Contactor: number;
  chargerOutputOKFeedback: number;
  auxiliaryTransformerOutputOKFeedback: number;
  theOutputOfChargerIsNormal: number;
  inverterOutputThreePhaseVoltageIsNormal: number;
  lowBatteryVoltageRedAlarm: number;
  sivslightFault: number;
  sivmediumFault: number;
  sivseriousFault: number;
  lineInputVoltage: number;
  inverterInputCurrent: number;
  outputLineVoltageOfInverterCircuit: number;
  voltageOfIntermediateCapacitorOfInverter: number;
  inverterOutputPhaseVoltageU: number;
  inverterOutputPhaseVoltageV: number;
  inverterOutputPhaseVoltageW: number;
  inverterOutputPhaseVoltageA: number;
  inverterOutputPhaseVoltageC: number;
  inverterOutputCurrentU: number;
  inverterOutputCurrentV: number;
  inverterOutputCurrentW: number;
  inverterOutputFrequency: number;
  outputVoltageOfChargerCircuit: number;
  outputCurrentOfChargerCircuit: number;
  chargingCurrentOfBatteryOfCharger: number;
  batteryTemperature: number;
  inverterModuleTemperature: number;
  dcvoltageAfterRectifierBridgeInputByCharger: number;
}

export interface FaultHistogramDataType {
  充电机: object,
  应急电源: object,
  蓄电池: object,
  牵引逆变器: object,
}
export interface FaultPageDataType {
  pageList: [];
  countTotal: number;
}