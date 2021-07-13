import request from 'umi-request';
import {
  TimeInterval,
  DataPoint,
  EnvironmentDataType,
  SpeedDataType,
  LashDataType,
} from './data.d';

export async function queryEnvironment(params: { trainCode: string; time: Date }) {
  return request<EnvironmentDataType>(
    `/api/vehicle/analysis/comfortability/environment/${params.trainCode}/by_time`,
    {
      // method: "POST",
      data: { time: params.time },
    },
  );
}

export async function querySpeed(params: { trainCode: string; time: Date }) {
  return request<SpeedDataType>(
    `/api/vehicle/analysis/comfortability/travel/${params.trainCode}/by_time`,
    {
      // method: "POST",
      data: { time: params.time },
    },
  );
}

export async function queryLash(params: { trainCode: string; time: Date }) {
  return request<LashDataType>(
    `/api/vehicle/analysis/comfortability/jerk/${params.trainCode}/by_time`,
    {
      // method: "POST",
      data: { time: params.time },
    },
  );
}
