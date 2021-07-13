export interface Member {
  avatar: string;
  name: string;
  id: string;
}
export interface TestItems {
  chemicalTest: string;
  mechanicalTest: string;
  metallographyTest: string;
}
export interface ListItemDataType {
  id: string;
  owner: string;
  title: string;
  avatar: string;
  cover: string;
  status: 'normal' | 'exception' | 'active' | 'success';
  percent: number;
  logo: string;
  href: string;
  body?: any;
  updatedAt: number;
  createdAt: number;
  subDescription: string;
  description: string;
  activeUser: number;
  newUser: number;
  star: number;
  like: number;
  message: number;
  content: string;
  members: Member[];

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
}
