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

export interface BasicInfoDataType {
  trainCode: string;
  createTime: Date;
  weight: number;
  operatingMileage: number;
  totalEnergyConsumption: number;
  totalLoad: number;
}

export interface ReliabilityDataType {
  trainCode: string;
  mtbf: number;
  mdbsf: number;
  reliabilityScore: number;
  systemNumber: [
    {
      type: string;
      value: number;
    },
  ];
}
export interface ComfortDataType {
  trainCode: string;
  temperatureScore: number;
  crowdingScore: number;
  travelScore: number;
  jerkScore: number;
  systemScore: [
    {
      type: string;
      value: number;
    },
  ];
}
export interface StabilityDataType {
  trainCode: string;
  drivingSafetyScore: number;
  efficiencyScore: number;
  faultCorrelationScore: number;
  maintenanceComplexityScore: number;
  systemScore: [
    {
      type: string;
      value: number;
    },
  ];
}
// export interface AssessmentBasicComponents {
//   trainCode: string;
//   createTime: Date;
//   weight: number;
//   operatingMileage: number;
//   totalEnergyConsumption: number;
//   totalLoad: number;
// }
// export interface AssessmentReliability {
//   trainCode: string;
//   systemNumber: { [index: string]: any }[];
//   MDBSF: number;
//   MTBF: number;
//   reliabilityScore: number;
// }

// export interface AssessmentComfortability {
//   trainCode: string;
//   temperatureScore: number;
//   crowdingScore: number;
//   travelScore: number;
//   jerkScore: number;
//   systemScore: { [index: string]: any }[];
// }

// export interface AssessmentStability {
//   trainCode: string;
//   drivingSafetyScore: number;
//   efficiencyScore: number;
//   faultCorrelationScore: number;
//   maintenanceComplexityScore: number;
//   systemScore: { [index: string]: any }[];
// }
