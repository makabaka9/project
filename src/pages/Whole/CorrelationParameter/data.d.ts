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