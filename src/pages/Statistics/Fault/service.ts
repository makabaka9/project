import request from 'umi-request';
import {FaultSystemDataType, FaultDistributionDataType, TripFaultDataType } from './data.d';


export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

// 某月各子系统故障分布(子系统名称与去年同月、当月、上月故障数)
export async function queryFaultDistribution(
  params: {
    trainCode: string,
    lineCode: string
    startTime: string,
  }
) {
  return request<FaultDistributionDataType>(
    `/api/statistics/fault/system_name_nums/${params.lineCode}/${params.trainCode}`,
    {
      params: { startTime: params.startTime, },
    }
  );
}

// 各子系统故障趋势分析(近12个月)
export async function queryFaultTrend(
  params: {
    trainCode: string,
    lineCode: string
    startTime: string,
  }
) {
  return request(
    `/api/statistics/fault/system_name_nums_year/${params.lineCode}/${params.trainCode}`,
    {
      params: { startTime: params.startTime, },
    }
  );
}

// 某月各子系统故障分布
export async function querySystemName(
  params: {
    trainCode: string,
    lineCode: string
    startTime: string,
  }
) {
  return request(
    `/api/statistics/fault/system_name_and_fault_num/${params.lineCode}/${params.trainCode}`,
    {
      params: { startTime: params.startTime, },
    }
  );
}

// 某月各车次故障统计
export async function queryTripFault(
  params: {
    lineCode: string
    startTime: string,
  }
) {
  return request<TripFaultDataType>(
    `/api/statistics/fault/fault_num/${params.lineCode}`,
    {
      params: { startTime: params.startTime, },
    }
  );
}

// 各子系统故障统计
export async function queryFaultSystem(
  params: {
    trainCode: string,
    lineCode: string
    startTime: string,
    pageNo: number,
    pageSize: number,
  }
) {
  return request<FaultSystemDataType>(
    `/api/statistics/fault/fault_system_train_code/${params.lineCode}/${params.trainCode}`,
    {
      params: { startTime: params.startTime, pageNo: params.pageNo, pageSize: params.pageSize },
    }
  );
}
