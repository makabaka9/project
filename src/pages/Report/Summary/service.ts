import { request } from 'umi';
import { ListItemDataType } from './data.d';

export async function queryReportList(params: ListItemDataType) {
  return request('/api/allReportForms', {
    params,
  });
}
export async function queryOrderIDReportList(params: ListItemDataType) {
  return request('/api/ReportForms/queryOrderID', {
    params,
  });
}
export async function queryOrderOtherList(params?: ListItemDataType) {
  return request('/api/ReportForms/queryOther', {
    method: 'POST',
    data: params,
    // params,
  });
}
