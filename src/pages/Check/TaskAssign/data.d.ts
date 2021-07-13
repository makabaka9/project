export interface TestItems {
  chemicalTest: string;
  mechanicalTest: string;
  metallographyTest: string;
}
export interface TestGroup {
  group: string;
  testAssignTime: string;
  userList: Array<string>;
}
export interface ListItemDataType {
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
  processMemberAssign: string;
  processDescription: string;
  testMemberAssign: Array<string>;

  taskAssign: Array<string>;
  taskAssignTime: number;
  submitTime: number;
  processTime: number;
  processFinishTime: number;
  testAssignTime: number;
  reviewTime: number;
  finishTime: number;
  flowStep: number;
  taskAssign: TestGroup[];
}
