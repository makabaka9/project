import { request } from 'umi';
import { RequestData } from '@ant-design/pro-table';
import { TableListItem } from './data.d';

export async function queryRule(params?: any) {
  return request<RequestData<TableListItem>>('/api/common/user/query', {
    method: 'POST',
    params: {
      current: params.current,
      pageSize: params.pageSize
    },
    data: {
      account: params.account,
      name: params.name,
      department: params.department,
      mail: params.mail,
      phone: params.phone
    }
  });
}

// 用户删除 传id数组，返回大于0成功
export async function removeRule(params: { ids: number[] }) {
  return request('/api/common/user/batchDelete', {
    method: 'POST',
    data:
      params.ids
    // method: 'delete',

  });
}

// 用户新增  返回用户id大于0表示成功
export async function addRule(params: TableListItem) {
  return request('/api/common/user', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

// 用户编辑 请求参数为包含id的对象，account不能更改，返回大于0成功
export async function updateRule(params: TableListItem) {
  return request('/api/common/user', {
    method: 'PUT',
    data: {
      ...params,
      // method: 'update',
    },
  });
}
