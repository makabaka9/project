export interface TableListItemMock {
  // key: number;
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
  account: string,
  name: string,
  gender: string,
  department: string,
  position: string,
  role: string,
  mail: string,
  phone: string;
  password: string;
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

export interface TableListItem {
  id:number;
  account: string,
  name: string,
  gender: string,
  department: string,
  position: string,
  role: string,
  mail: string,
  phone: string;
  password: string;
}
