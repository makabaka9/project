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

export interface EnergyStatisticsDay {
  monthData: [{
    id: string
    lineCode: string
    trainCode: string
    dt: string
    wload: number
    regeneration: number
    braking: number
    auxiliary: number
    absorb: number
    energy: number
    unitRegeneration: number
    unitBraking: number
    unitAuxiliary: number
    unitAbsorb: number
    unitEnergy: number
    avgRegeneration: number
    avgBraking: number
    avgAuxiliary: number
    avgAbsorb: number
    avgEnergy: number
    sequentialRegeneration: number
    sequentialBraking: number
    sequentialAuxiliary: number
    sequentialAbsorb: number
    sequentialEnergy: number
  }],
  dayData:[{
    id: string;
    lineCode: string;
    trainCode: string;
    dt: string;
    wload: number;
    regeneration: number;
    braking: number;
    auxiliary: number;
    absorb: number;
    energy: number;
    unitRegeneration: number;
    unitBraking: number;
    unitAuxiliary: number;
    unitAbsorb: number;
    unitEnergy: number;
    avgRegeneration: number;
    avgBraking: number;
    avgAuxiliary: number;
    avgAbsorb: number;
    avgEnergy: number;
    sequentialRegeneration: number;
    sequentialBraking: number;
    sequentialAuxiliary: number;
    sequentialAbsorb: number;
    sequentialEnergy: number;
  }],
  energyInfo: [{
    deviation: number
    deviationMax: number
    energy: number
    energyTotal: number
    regeneration: number
    regenerationRatio: number
    unitAbsorb: number
  }]
}
