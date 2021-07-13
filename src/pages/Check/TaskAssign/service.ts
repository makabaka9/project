import request from 'umi';
import { ListItemDataType } from './data.d';

export async function queryMonitorOrderList(params: ListItemDataType) {
  return request('/api/testMonitorNotAssignForms', {
    method: 'GET',
    params,
  });
}
export async function queryMonitorOrderListLength(params: ListItemDataType) {
  return request('/api/testMonitorNotAssignFormsLength', {
    method: 'GET',
    params,
  });
}
export async function queryUserList(params: any) {
  return request('/api/query_users', {
    method: 'POST',
    data: params,
  });
}
export async function addMonitorOrderList(params: any) {
  return request(`/api/testMonitorAssignForms/${params.key}`, {
    method: 'PUT',
    data: params.event,
  });
}
export async function queryMonitorAssignedOrderList(params: ListItemDataType) {
  return request('/api/testMonitorAssignedForms', {
    method: 'GET',
    params,
  });
}
