import request from 'umi-request';
import { BasicInfoDataType, ReliabilityDataType, ComfortDataType, StabilityDataType } from './data';

export async function queryBasicInfo(trainCode: string) {
  return request<BasicInfoDataType>(`/api/vehicle/analysis/assessment/basic/${trainCode}`, {});
}

export async function queryReliability(trainCode: string) {
  return request<ReliabilityDataType>(
    `/api/vehicle/analysis/assessment/reliability/${trainCode}`,
    {},
  );
}

export async function queryComfort(trainCode: string) {
  return request<ComfortDataType>(
    `/api/vehicle/analysis/assessment/comfortability/${trainCode}`,
    {},
  );
}
export async function queryStability(trainCode: string) {
  return request<StabilityDataType>(`/api/vehicle/analysis/assessment/stability/${trainCode}`, {});
}
