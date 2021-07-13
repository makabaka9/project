export interface VisitDataType {
  x: string;
  y: number;
}

export interface TotalSpeedTimeDataType {
  upTotalAverageTime: number;
  upTotalAverageSpeed: number;
  downTotalAverageTime: number;
  downTotalAverageSpeed: number;
}

export interface SiteStatusDataType {
  upSpeed: number,
  upRunTime: number,
  upStopTime: number,
  downSpeed: number,
  stationName: string,
  downRunTime: number,
  downStopTime: number,
  statistcsTime: string,
  useRate: number
}

export interface SiteSpeedTimeDataType {
  upSpeed: number;
  upRunTime: number;
  downRunTime: number;
  downSpeed: number;
  siteName: string;
}