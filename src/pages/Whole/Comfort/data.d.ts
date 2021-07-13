export interface TagType {
  name: string;
  value: string;
  type: string;
}

export interface TimeInterval {
  startTime: Date;
  endTime: Date;
}

export interface DataPoint {
  time: Date;
  value: Number;
}

export interface EnvironmentDataType {
  mainPrice: number;
  evaluationScore: number;
  Tooltip: string;
  temperatureComfort: DataPoint[];
  crowding: DataPoint[];
}

export interface SpeedPoint {
  time: Date;
  value: number;
}

export interface SpeedDataType {
  score: number;
  onTime: boolean;
  travelAppraise: SpeedPoint[];
}

export interface LashPoint {
  time: Date;
  type: string;
  value: number;
}

export interface LashDataType {
  score: number;
  speed: LashPoint[];
}
