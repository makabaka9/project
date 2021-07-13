export interface TestItems {
  chemicalTest: string;
  mechanicalTest: string;
  metallographyTest: string;
}

export interface ListItemDataType {
  assignedGroup: Array<string>;
  physicalChemicalType: string;
  _id: string;
  orderID: string;
  clientCompany: string;
  clientDate: string;
  clientAgent: string;
  clientPhone: string;
  clientAddress: string;
  sampleName: string;
  sampleMaterial: string;
  sampleModel: string;
  sampleNumber: string;
  sampleQuantity: string;
  sampleDraw: string;
  sampleState: string;
  sampleProcess: string;
  detectionMethod: string;
  processingMethod: string;
  processingRequire: string;
  completeTime: string;
  disposalMethod: string;
  chemicalComposition: Array<string>;
  Metallography: Array<string>;
  stretchingTest: Array<string>;
  bendingTest: string;
  bendingDiameter: string;
  impactTest: string;
  hardnessTest: string;
  springTest: string;
  gaps: string;
  impactTestTemperature: string;
  workLoad: string;
  gapsQuantity: string;
  testItems: Array<string>;
  testMonitorAssign: string;
  processMonitorAssign: string;
  rawTestData: RawTestData[];
  actTime: string;
}

export interface RawTestData {
  testReviewer: String;
  testGroup: string;
  review: Review[];
}

export interface Review {
  actTime: string;
}
