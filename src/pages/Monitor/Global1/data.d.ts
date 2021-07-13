export interface SysListType {
  subSysName: string;
  faultNum: number;
  samePer: number;
  roundPer: number;
}

export interface SearchDataType {
  faultCode: string;
  faultName: string;
  lineCode: string;
  trainCode: string;
  coachCode: string;
  faultType: string;
  trainFaultLevel: number;
  faultSolution: string;
  repairSuggestion: string | null;
  faultDescription: string;
  happenTime: string;
  resetTime: string | null;
  status: number;
  currentLocation: string;
}

export interface CurrentDirType {
  totalTrain?: number;
  onLineTrain?: number;
  millionMeter?: number;
  upDirection?: Array<number>;
  downDirection?: Array<number>;
}

export interface AnalysisData {
  trainCode: string;
  monthNum: number;
  rate: number;
}

export interface TopTenData {
  trainCode: string;
  faultNum: number;
}

export interface subFaultType {
  systemName: string;
  faultNum: number;
}

export interface BasicProfileDataType {
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
  pantographStatus: number;
  batteryUnderVoltage: number;
  stateTime:string
}
