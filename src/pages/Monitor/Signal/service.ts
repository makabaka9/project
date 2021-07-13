import request from 'umi-request';
// import { BasicProfileDataType } from './data.d';

// export async function queryTrainList(params: BasicProfileDataType) {
//   return request('/api/train/query', {
//     method: 'POST',
//     data: params,
//   });
// }

export async function queryTrainList() {
  return request('/cj6/monitoring/list_train', {
    method: 'GET',
    // params,
  });
}
