//import request from '@/utils/request';
import { request } from 'umi';
import { ListItemDataType } from './data.d';

export async function queryApproveList(params: ListItemDataType) {
  return request('/api/reportApproveTaskForms', {
    method: 'GET',
    params,
  });
}

export async function addApproveList(params: any) {
  return request(`/api/reportApproveData/${params.key}`, {
    method: 'PUT',
    data: params,
  });
}
// export async function queryOrderList(params: ListItemDataType) {
//   return request('/api/reports', {
//     method: 'GET',
//     params,
//   });
// }
// export async function queryUserList(params: any) {
//   return request('/api/users', {
//     // method: 'POST',
//     params,
//   });
// }
// export async function addOrderList(params: any) {
//   return request(`/api/forms/${params.key}`, {
//     method: 'PUT',
//     data: params.event,
//   });
// }
