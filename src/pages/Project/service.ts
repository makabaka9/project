// import request from '@/utils/request';
import { request } from 'umi';
import { ProjectItemDataType, CalibrationItemDataType } from './data.d';
import { TableListParams } from './ProjectList/data';

export async function UpdateFormById(params: any) {//根据id更新信息
  console.log(params)
  return request(`/api/projects/${params.projectID}`, {
    method: 'PUT',
    data: params,
  });
}

export async function removeForm(params: any) {
  return request(`/api/forms/${params.key}`, {
    method: 'DELETE',
    data: {
      ...params,
    },
  });
}

export async function CurrentUser(): Promise<any> {
  return request('/api/currentUser', {
    // method: 'GET',
    // data: params,
  });
}
export async function queryOrderList(params: ProjectItemDataType) {
  return request('/api/submitForms', {
    method: 'GET',
    params,
  });
}
export async function queryProjectById(params: ProjectItemDataType) {//根据ID获取项目信息
  console.log(params);
  return request('/api/projects/query', {
    method: 'POST',
    params,
  });
}
export async function queryRejectedOrderList(params: ProjectItemDataType) {
  return request('/api/submitRejectedForms', {
    method: 'GET',
    params,
  });
}
export async function queryCalibrationOrderList(params: CalibrationItemDataType) {
  return request('/api/submitForms', {
    method: 'GET',
    params,
  });
}
export async function queryProject(params?: TableListParams) {//获取所有项目
  return request('/api/projects', {
    method: 'GET',
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