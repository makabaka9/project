export interface VisitDataType {
  x: string;
  y: number;
}

export interface SearchDataType {
  index: number,
  trainCode: string,
  totalMiles: number,
  monthMiles: number,
  termsValue: number,
  ratioValue: number,
  utilizationRate:number
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
