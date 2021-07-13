export interface TestItems {
  chemicalTest: string;
  mechanicalTest: string;
  metallographyTest: string;
}

export interface ProjectItemDataType {
  projectID:string,
  projectManager:string, 
  projectCompany:string,
  projectName:string,
  projectCategory:string,
  projectStartTime:string,
  projectEndTime:string,
  projectBudget:string,
  projectOutsource:string,
  projectIntroduction:string,
  projectResearchContent:string,

  // assignRejectReason: string;
  // id: string | number | undefined;
  // physicalChemicalType: string;
  // _id: string;
  // orderID: string;
  // clientCompany: string;
  // clientDate: string;
  // clientAgent: string;
  // clientPhone: string;
  // clientAddress: string;
  // sampleName: string;
  // sampleMaterial: string;
  // sampleModel: string;
  // sampleNumber: string;
  // sampleQuantity: string;
  // sampleDraw: string;
  // sampleState: string;
  // sampleProcess: string;
  // detectionMethod: string;
  // processingMethod: string;
  // processingRequire: string;
  // completeTime: string;
  // disposalMethod: string;
  // chemicalComposition: Array<string>;
  // Metallography: Array<string>;
  // stretchingTest: Array<string>;
  // bendingTest: string;
  // bendingDiameter: string;
  // impactTest: string;
  // hardnessTest: string;
  // springTest: string;
  // gaps: string;
  // impactTestTemperature: string;
  // workLoad: string;
  // gapsQuantity: string;
  // testItems: Array<string>;
  
  // usercode: string;
  // username: string;
  // taskAssignTime: number;
  // submitTime: number;
  // processTime: number;
  // processFinishTime: number;
  // testAssignTime: number;
  // flowStep: number | undefined;
}

export interface CalibrationItemDataType {
  _id: string;
  orderID: string;
  calibrationTestType: string;
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
  completeTime: string;
  usercode: string;
  username: string;
  attachment: string;
  visualInspection: string;
  calibrationHours: string;
  calibrationCost: string;
  repairCost: string;
  clientRequire: string;
  submitTime: number;
  flowStep: number | undefined;
}
