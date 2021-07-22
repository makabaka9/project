//import request from '@/utils/request';
import { request } from 'umi';
import { TableListParams } from './data.d';

export async function queryUser(params?: TableListParams) {//获取所有项目
  return request('/api/projects', {
    method: 'POST',
    data: params,
  });
}

export async function queryUserBySearch(params?: TableListParams) {
  return request('/api/searchUsers', {
    params,
  });
}

export async function removeUser(params: TableListParams) {
  return request('/api/users', {
    method: 'DELETE',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addUser(params: TableListParams) {
  return request('/api/users', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateUser(params: TableListParams) {
  return request('/api/users', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
