export interface TrainsMonitorType {
  trainCode: string;
  runState: number;
  trainWorkCondition: number;
  trainSpeed: number;
  currentStation: string;
  nextStation: string;
  totalMiles: number;
  track: number;
  brake: number;
  fastTrack: number;
  keepBrakeRelieve: number;
  direction: number;
  driverCab: number;
}
export interface TrainBasicInfoType {
  trainCode: string;
  speedLimit: number;
  trainWorkingCondition: number;
  speed: number;
  indexStation: number;
  nextStation: number;
  totalLoad: number;
  runningDirection: number;
  operatingMileage: number;
  tractionEnergyConsumption: number;
  brakeEnergyConsumption: number;
  gridVoltage: number;
  intermediateCurrent: number;
  stateTime: string;
}
export interface ImportantParams {
  TC1: {
    loadCapacity: number;
    tractionStatus: number;
    brakingStatus: number;
    doorClosed1: number;
    doorClosed2: number;
    doorClosed3: number;
    doorClosed4: number;
    doorClosed5: number;
    doorClosed6: number;
    doorClosed7: number;
    doorClosed8: number;
    fireStatus1: number;
    fireStatus2: number;
    fireStatus3: number;
    fireStatus4: number;
    fireStatus5: number;
    fireStatus6: number;
    fireExtinguisherStatus1: number;
    fireExtinguisherStatus2: number;
    fireExtinguisherStatus3: number;
    fireExtinguisherStatus4: number;
    airConditionerClosed: number;
  },
  TC2: {
    loadCapacity: number;
    tractionStatus: number;
    brakingStatus: number;
    doorClosed1: number;
    doorClosed2: number;
    doorClosed3: number;
    doorClosed4: number;
    doorClosed5: number;
    doorClosed6: number;
    doorClosed7: number;
    doorClosed8: number;
    fireStatus1: number;
    fireStatus2: number;
    fireStatus3: number;
    fireStatus4: number;
    fireStatus5: number;
    fireStatus6: number;
    fireExtinguisherStatus1: number;
    fireExtinguisherStatus2: number;
    fireExtinguisherStatus3: number;
    fireExtinguisherStatus4: number;
    airConditionerClosed: number;
  },
  MP1: {
    loadCapacity: number;
    tractionStatus: number;
    brakingStatus: number;
    doorClosed1: number;
    doorClosed2: number;
    doorClosed3: number;
    doorClosed4: number;
    doorClosed5: number;
    doorClosed6: number;
    doorClosed7: number;
    doorClosed8: number;
    fireStatus1: number;
    fireStatus2: number;
    fireStatus3: number;
    fireStatus4: number;
    fireStatus5: number;
    fireStatus6: number;
    fireExtinguisherStatus1: number;
    fireExtinguisherStatus2: number;
    fireExtinguisherStatus3: number;
    fireExtinguisherStatus4: number;
    airConditionerClosed: number;
  },
  MP2: {
    loadCapacity: number;
    tractionStatus: number;
    brakingStatus: number;
    doorClosed1: number;
    doorClosed2: number;
    doorClosed3: number;
    doorClosed4: number;
    doorClosed5: number;
    doorClosed6: number;
    doorClosed7: number;
    doorClosed8: number;
    fireStatus1: number;
    fireStatus2: number;
    fireStatus3: number;
    fireStatus4: number;
    fireStatus5: number;
    fireStatus6: number;
    fireExtinguisherStatus1: number;
    fireExtinguisherStatus2: number;
    fireExtinguisherStatus3: number;
    fireExtinguisherStatus4: number;
    airConditionerClosed: number;
  },
  M1: {
    loadCapacity: number;
    tractionStatus: number;
    brakingStatus: number;
    doorClosed1: number;
    doorClosed2: number;
    doorClosed3: number;
    doorClosed4: number;
    doorClosed5: number;
    doorClosed6: number;
    doorClosed7: number;
    doorClosed8: number;
    fireStatus1: number;
    fireStatus2: number;
    fireStatus3: number;
    fireStatus4: number;
    fireStatus5: number;
    fireStatus6: number;
    fireExtinguisherStatus1: number;
    fireExtinguisherStatus2: number;
    fireExtinguisherStatus3: number;
    fireExtinguisherStatus4: number;
    airConditionerClosed: number;
  },
  M2: {
    loadCapacity: number;
    tractionStatus: number;
    brakingStatus: number;
    doorClosed1: number;
    doorClosed2: number;
    doorClosed3: number;
    doorClosed4: number;
    doorClosed5: number;
    doorClosed6: number;
    doorClosed7: number;
    doorClosed8: number;
    fireStatus1: number;
    fireStatus2: number;
    fireStatus3: number;
    fireStatus4: number;
    fireStatus5: number;
    fireStatus6: number;
    fireExtinguisherStatus1: number;
    fireExtinguisherStatus2: number;
    fireExtinguisherStatus3: number;
    fireExtinguisherStatus4: number;
    airConditionerClosed: number;
  },
}
export interface TrainsData {
  name: string;
  label: string;
  value: number;
}

export interface BasicProfileDataType {
  emergencyBrake: string;
  quickBrake: string;
  faultNum: ReactNode;
  trainCode: string;
  trainType: string;
}

export interface subsystemDataType {
  dataName: string;
  desc1: string;
  desc2: string;
  desc3: string;
  desc4: string;
  desc5: string;
  desc6: string;
}

export interface OperationStatusDataType {
  motorTemperature: DoubleLine[];
  intermediateVoltage: DoubleLine[];
  inverterCurrent: DoubleLine[];
  intermediateCurrent: DoubleLine[];
}