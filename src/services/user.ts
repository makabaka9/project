import { request } from 'umi';
import { API } from './API';
export async function query() {
  return request<API.CurrentUser[]>('/api/users');
}

export async function queryCurrent() {
  return request<API.CurrentUser>('/api/currentUser');
}

export async function queryNotices(): Promise<any> {
  return request<{ data: API.NoticeIconData[] }>('/api/notices');
}

// 获取故障通知
// export async function queryFaultNotice() {
//   return request<{ data: API.FaultInfoDataType[] }>('/cj6/fault/list_fault_notify', {
//   });
// }
// export async function updateFaultNotice(params:any) {
//   return request ('/cj6/fault/update_list_fault', {
//     method:'POST',
//     params
//   });
// }