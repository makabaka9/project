//import request from '@/utils/request';
import { request } from 'umi';
import { ListItemDataType } from './data.d';

export async function queryReviewerList(params: ListItemDataType) {
  return request('/api/reportReviewTaskForms', {
    method: 'GET',
    params,
  });
}

export async function addReviewList(params: any) {
  return request(`/api/reportReviewData/${params.key}`, {
    method: 'PUT',
    data: params,
  });
}
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
