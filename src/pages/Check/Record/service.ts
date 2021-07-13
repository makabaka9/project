import request from 'umi';
import { ListItemDataType } from './data.d';

export async function queryTestOrderList(params: ListItemDataType) {
  return request('/api/testTaskForms', {
    method: 'GET',
    params,
  });
}
export async function queryTestOrderListLength(params: any) {
  return request('/api/testTaskFormsLength', {
    method: 'GET',
    params,
  });
}
export async function queryIsTestedOrderList(params: ListItemDataType) {
  return request('/api/isTestedTaskForms', {
    method: 'GET',
    params,
  });
}
export async function queryIsRejectedOrderList(params: ListItemDataType) {
  return request('/api/test/isRejectedTaskForms', {
    method: 'GET',
    params,
  });
}
export async function TestSubmitForm(params: any) {
  return request(`/api/rawTestData/${params.key}`, {
    method: 'PUT',
    data: params,
  });
}
export async function queryUserList(params: any) {
  return request('/api/query_users', {
    method: 'POST',
    data: params,
  });
}
