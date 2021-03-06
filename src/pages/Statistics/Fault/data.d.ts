export interface VisitDataType {
  x: string;
  y: number;
}

export interface SearchDataType {
  index: number;
  keyword: string;
  count: number;
  range: number;
  status: number;
}

export interface OfflineDataType {
  name: string;
  cvr: number;
}

export interface OfflineChartData {
  x: any;
  y1: number;
  y2: number;
}

export interface RadarData {
  name: string;
  label: string;
  value: number;
}

export interface AnalysisData {
  visitData: VisitDataType[];
  visitData2: VisitDataType[];
  salesData: VisitDataType[];
  searchData: SearchDataType[];
  offlineData: OfflineDataType[];
  offlineChartData: OfflineChartData[];
  salesTypeData: VisitDataType[];
  salesTypeDataOnline: VisitDataType[];
  salesTypeDataOffline: VisitDataType[];
  radarData: RadarData[];
}

export interface SystemNameDataType {
  systemName: string;
  faultNum: number;
}

export interface FaultSystemDataType {
  systemName: string;
  faultNum: number;
  faultPercentAge: number;
  currentMonthRate: number;
  yearOnYear: string;
  monthOnMonth: number;
}

export interface FaultDistributionDataType {
  systemName: string;
  currentMonthNum: number;
  lastMonthNum: number;
  lastYearNum: number;
}

export interface TripFaultDataType {
  trainCode:string;
  faultNum:number;
}