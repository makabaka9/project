export interface TableListItem {
  key?: number;
  disabled?: boolean;
  avatar: string;

  id: number;
  username: string;
  department: string;
  role: string;
  telephone: string;
  password: string;
  status: number;
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
  sorter?: string;
  status?: string;

  id?: number;
  key?: number;
  username?: string;
  department?: string;
  role?: string;
  telephone?: string;
  group?: string;
  position?: string;
  password?: string;
  position?: string;
  desc?: string;
  pageSize?: number;
  currentPage?: number;
}
