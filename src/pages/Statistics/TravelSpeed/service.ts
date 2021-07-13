import request from 'umi-request';
import { SiteSpeedTimeDataType, SiteStatusDataType, TotalSpeedTimeDataType } from './data';




export async function queryTotalSpeedTime(
  params: {
    startTime: string,
  }
) {
  return request<TotalSpeedTimeDataType>(
    `/api/statistics/speed/total_speed_time`,
    {
      params: { startTime: '2020-11-20' },
    }
  );
}

export async function querySiteSpeedTime(
  params: {
    startTime: string,
  }
) {
  return request<SiteSpeedTimeDataType>(
    `/api/statistics/speed/site_speed_time`,
    {
      params: { startTime: '2020-11-20' },
    }
  );
}

export async function querySiteStatus(
  params: {
    startTime: string,
  }
) {
  return request<SiteStatusDataType>(
    `/api/statistics/speed/speed_site`,
    {
      params: { startTime: '2020-11-20' },
    }
  );
}