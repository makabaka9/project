export interface VisitDataType {
  x: string;
  y: number;
}

export interface PassengerFlowDayDataType {
  maxPassengerVolume: number
  maxTime: string
  minPassengerVolume: number
  minTime: string
  timePointList: [
    { passengerFlow: number, timePoint: string }
  ]
}



