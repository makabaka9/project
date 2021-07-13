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

export interface BrakingForceDataType {
  electricBrakingCapacity: number,
  actualElectricBrakingCapacity: number
}


export interface BrakeOperationStatusMonitoringDataType {
  braking: number;
  electricBrakingCapacity: number;
  actualElectricBrakingForce: number;
  quickBraking: number;
  holdBrakeRelease: number;
  electricBrakeAvailable: number;
  electricBrakingIsEffective: number;
  electricBrakingSliding: number;
  electricBrakingAttenuation: number;
  frameSliding1: number;
  frameEmergencyBrakeApplication1: number;
  frameBrakeReleased1: number;
  lowPressureOfBrakeAirCylinderOfFrame1: number;
  frameAirBrakeStatus1: number;
  frameSliding2: number;
  frameEmergencyBrakeApplication2: number;
  frameBrakeReleased2: number;
  lowPressureOfBrakeAirCylinderOfFrame2: number;
  frameAirBrakeStatus2: number;
  brakeFrameAirCylinderPressure1: number;
  actualBrakingForceOfFrame1: number;
  frameBrakeCylinderPressure1: number;
  airBrakeCapacityOfFrame1: number;
  frame1AirSpring1Pressure: number;
  frame1AirSpring2Pressure: number;
  brakeFrameAirCylinderPressure2: number;
  actualBrakingForceOfFrame2: number;
  frameBrakeCylinderPressure2: number;
  airBrakeCapacityOfFrame2: number;
  frame2AirSpring1Pressure: number;
  frame2AirSpring2Pressure: number;
  axialSpeed1: number;
  axialSpeed2: number;
  axialSpeed3: number;
  axialSpeed4: number;

}
export interface FaultPageDataType {
  pageList: [];
  countTotal: number;
}



