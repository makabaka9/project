import request from 'umi-request';
import { EffectDataType, DimensionDataType } from './data';

export async function queryFault(trainCode: string) {
  return request(`/api/vehicle/analysis/health/fault/${trainCode}`, {});
}
export async function queryFourdimension(trainCode: string) {
  return request(`/api/vehicle/analysis/health/evaluate/${trainCode}`, {});
}
export async function queryEffect(trainCode: string) {
  return request<EffectDataType>(`/api/vehicle/analysis/health/stability/${trainCode}`, {});
}
export async function queryDimension(trainCode: string) {
  return request<DimensionDataType>(`/api/vehicle/analysis/health/effect/${trainCode}`, {});
}
export async function queryMachine(trainCode: string) {
  return request(`/api/vehicle/analysis/health/machine/${trainCode}`, {});
}
export async function queryDoor(trainCode: string) {
  return request(`/api/vehicle/analysis/health/door/${trainCode}`, {});
}
export async function queryElectric(trainCode: string) {
  return request(`/api/vehicle/analysis/health/electric/${trainCode}`, {});
}
export async function queryStop(trainCode: string) {
  return request(`/api/vehicle/analysis/health/brake/${trainCode}`, {});
}
