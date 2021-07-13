import { request } from 'umi';
export async function queryAllTrainCode() {
  return request<API.TrainCodeType>('/api/currentUser');
}
