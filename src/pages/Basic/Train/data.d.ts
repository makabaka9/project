export interface TableListItem {
  key: number;
  line:string;
  trainCode:string;
  time:string;
  mileage:string;
  state:string;
  // disabled?: boolean;
  // href: string;
  // avatar: string;
  // name: string;
  // owner: string;
  // desc: string;
  // callNo: number;
  // status: number;
  // updatedAt: Date;
  // createdAt: Date;
  // progress: number;
  // username: string;
  // realname: string;
  // orgCode: string;
  // phone: string;
  // email: string;
  // password: string;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  // sorter?: string;
  // status?: string;
  // name?: string;
  // desc?: c
  // key?: number;
  // pageSize?: number;
  // currentPage?: number;
  username: string;
  realname: string;
  orgCode: string;
  phone: string;
  email: string;
  password: string;
}
