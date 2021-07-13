import request from 'umi-request';
import { TrainsMonitorType, TrainBasicInfoType, OperationStatusDataType } from './data.d';
// 重要参数测试接口
export async function queryImportant() {
  return request('/api/monitor/state/hmi', {
    method: 'GET',
    // params,
  });
}
// 测试接口
export async function queryCheshi() {
  return request('/api/tcp/hmi/regenerated', {
    method: 'GET',
    // params,
  });
}