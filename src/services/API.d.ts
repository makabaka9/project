declare namespace API {
  export interface CurrentUser {
    avatar?: string;
    name?: string;
    title?: string;
    group?: string;
    signature?: string;
    tags?: {
      key: string;
      label: string;
    }[];
    userid?: string;
    access?: 'user' | 'guest' | 'admin';
    unreadCount?: number;
  }

  export interface LoginStateType {
    status?: 'ok' | 'error';
    type?: string;
    token?: string;
  }
  export interface TrainCodeType {
    trainCode: array;
  }

  export interface NoticeIconData {
    id: string;
    key: string;
    avatar: string;
    title: string;
    datetime: string;
    type: string;
    read?: boolean;
    description: string;
    clickClose?: boolean;
    extra: any;
    status: string;
  }
}
export interface FaultInfoDataType {
  total: number;
  phmFaultRepairs: [{
    trainCode: string,
    faultCode: string,
    faultName: string,
    faultType: string,
    faultLevel: string,
    happenTime: string,
  }]
}
