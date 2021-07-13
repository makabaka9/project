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

export interface OperationStatusMonitoringDataType {
  motorTemperature1: number
  motorTemperature2: number
  motorTemperature3: number
  motorTemperature4: number
  inverterCurrent: number
  intermediateVoltage: number
  intermediateCurrent: number
  givenTraction: number
  actualTraction: number
}
export interface DoubleLine {
  time: string;
  value: value;
  type: string;
}
export interface OperationStatusDataType {
  motorTemperature: DoubleLine[];
  intermediateVoltage: DoubleLine[];
  inverterCurrent: DoubleLine[];
  intermediateCurrent: DoubleLine[];
}

export interface TractionStateParametersDataType {
  tow: number;
  startingOfTractionInverter: number;
  tractionInverterIdling: number;
  electricBrakingOfTractionInverter: number;
  highSpeedCircuitBreakerClosed: number;
  chargingContactorClosed: number;
  shortCircuitContactorClosed: number;
  electricBrakeAvailable: number;
  electricBrakingAttenuation: number;
  electricBrakingSliding: number;
  intermediateVoltage: number;
  intermediateCurrent: number;
  gridVoltage: number;
  inverterCurrent: number;
  comprehensiveSpeedOfMotor: number;
  chopTime: number;
  chopCurrent1: number;
  chopCurrent2: number;
  motorTemperature1: number;
  motorTemperature2: number;
  motorTemperature3: number;
  motorTemperature4: number;
  tractionPower: number;
  trainActualElectricBrakingForce: number;
  trainTraction: number;
  trainElectricBrakingCapacity: number;
}

export interface FaultHistogramDataType {
  电机温度传感器: object,
  VVVF牵引逆变器: object,
  短接接触器: object,
  电压传感器: object,
  高速断路器: object,
  制动电阻: object,
  充电接触器: object,
}



export interface FaultPageDataType {
  pageList: [];
  countTotal: number;
}