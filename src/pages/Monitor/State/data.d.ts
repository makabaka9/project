// export interface Member {
//   avatar: string;
//   name: string;
//   id: string;
// }

// export interface ListItemDataType {
//   id: string;
//   uType: string;
//   title: string;
//   avatar: string;
//   cover: string;
//   status: 'normal' | 'exception' | 'active' | 'success';
//   percent: number;
//   logo: string;
//   href: string;
//   body?: any;
//   updatedAt: number;
//   createdAt: number;
//   subDescription: string;
//   description: string;
//   activeUser: number;
//   newUser: number;
//   star: number;
//   like: number;
//   message: number;
//   content: string;
//   members: Member[];
// }
export interface BasicProfileDataType {
  // trainCode: string;
  // currentStation: string|number;
  // nextStation: string|number;
  // stateTime: string;
  // state: number;
  // speedPerHour: number;
  // faultNum: number;
  // // workCondition: string;
  // direction: string;
  trainCode: string;
  speedLimit: number;
  trainWorkingCondition: number;
  speed: number;
  indexStation: number;
  nextStation: number;
  totalLoad: number;
  runningDirection: number;
  operatingMileage: number;
  tractionEnergyConsumption: number;
  brakeEnergyConsumption: number;
  gridVoltage: number;
  intermediateCurrent: number;
  pantographStatus: number;
  batteryUnderVoltage: number;
  stateTime:string
}
