export interface ListItemDataType {
  id: string | number | undefined;
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
  Mechanics: Array<string>;
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
  testMemberAssign: string;
  // mechanicsTestMemberAssign: string;
  rawTestData: RawTestData[]
  testReviewer: string;
  submitTime: number;
}
export interface RawTestData {
  testName: string;
  // metallographyTestPerson: string;
  testLocal: string;
  testTime: string;
  testBasis: Array<string>;
  judgeBasis: string;
  testDevice: Array<string>;
  testTemperature: string;
  testHumidity: string;
  testRecord: string;
  testTime: string;
  testUsercode: string;
  testUsername: string;

}

