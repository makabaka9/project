import request from 'umi';
import { ListItemDataType } from './data.d';

export async function queryReviewerList(params: ListItemDataType) {
  return request('/api/testReviewerTaskForms', {
    method: 'GET',
    params,
  });
}
export async function queryReviewerListLength(params: any) {
  return request('/api/testReviewerTaskFormsLength', {
    method: 'GET',
    params,
  });
}
export async function queryIsReviewedList(params: ListItemDataType) {
  return request('/api/testIsReviewedForms', {
    method: 'GET',
    params,
  });
}
export async function queryIsRejectedList(params: ListItemDataType) {
  return request('/api/testIsRejectedForms', {
    method: 'GET',
    params,
  });
}
export async function queryUserList(params: any) {
  return request('/api/users', {
    // method: 'POST',
    params,
  });
}
export async function addReviewList(params: any) {
  return request(`/api/testReviewerData/${params.key}`, {
    method: 'PUT',
    data: params,
  });
}
