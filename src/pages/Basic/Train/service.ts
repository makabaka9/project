import { request } from 'umi';
import { TableListParams, TableListItem } from './data';

export async function queryRule(params?: TableListParams) {
  return request('/api/mro/trainprofile', {
    params,
  });
}

export async function removeRule(params: { ids: number[] }) {
  return request('/api/sys/user/deleteBatch', {
    method: 'DELETE',
    params,
    data: {
      ...params,
      // method: 'delete',
    },
  });
}

export async function addRule(params: TableListItem) {
  return request('/api/sys/user/add', {
    method: 'POST',
    data: {
      ...params,
      // method: 'post',
    },
  });
}

export async function updateRule(params: TableListParams) {
  return request('/api/sys/user/edit', {
    method: 'PUT',
    data: {
      ...params,
      // method: 'update',
    },
  });
}
