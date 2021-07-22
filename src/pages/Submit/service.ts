// import request from '@/utils/request';
import { request } from 'umi';
import { ProjectItemDataType, CalibrationItemDataType } from './data.d';

export async function SubmitForm(params: any) {
  console.log(params)
  return request('/api/projects/add', {//提交项目申请表单
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
export async function queryProject(params: ProjectItemDataType) {
  console.log(params);
  return request(`/api/projects/${params.projectID}`, {
    method: 'GET',
    //params,
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
