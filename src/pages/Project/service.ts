// import request from '@/utils/request';
import { request } from 'umi';
import { ProjectItemDataType, CalibrationItemDataType } from './data.d';

export async function SubmitForm(params: any) {
  return request('/api/forms', {
    method: 'POST',
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
