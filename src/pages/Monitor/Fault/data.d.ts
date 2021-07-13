export interface BasicProfileDataType {
  id: string | number | undefined;
  trainCode: string;
  faultType: string;
  faultNum: number;
}

export interface FaultDataType {
  trainCode: string;
  HVAC: number|null;
  DCU: number|null;
  PDS: number|null;
  EDCU: number|null;
  SIV: number|null;
  BCU: number|null;
  AODS: number|null;
  TDS: number|null;
  PIS: number|null;
  TCMS: number|null;
  FAS: number|null;
}

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
// export interface BasicProfileDataType {
//   id: string | number | undefined;
//   kt: ReactNode;
//   qy: ReactNode;
//   ckxx: ReactNode;
//   cm: ReactNode;
//   gw: ReactNode;
//   fz: ReactNode;
//   zdza: ReactNode;
//   zd: ReactNode;
//   zxb: ReactNode;
//   wl: ReactNode;
//   yh: ReactNode;
//   trainCode: string;
//   trainNumberCode: string;
//   trainAscription: string;
//   longitude: string;
//   latitude: string;
//   time: string;
//   tractionEnergy: number;
//   regenerationEnergy: number;
//   operatingState: number;
//   trainTemperature: number;
//   speed: number;
//   mile: number;
//   faultNum: number;
//   distance: number;
// }
