import request from 'umi-request';
// import { BasicProfileDataType } from './data.d';

// export async function queryTrainList(params: BasicProfileDataType) {
//   return request('/api/train/query', {
//     method: 'POST',
//     data: params,
//   });
// }

export async function stateInformation(params:any) {
  return request('/api/monitor/state', {
    method: 'GET',
    params
  });
}
