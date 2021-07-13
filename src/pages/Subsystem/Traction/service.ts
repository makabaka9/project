import request from 'umi-request';
import { OperationStatusMonitoringDataType, OperationStatusDataType, TractionStateParametersDataType, FaultHistogramDataType } from './data';


export async function queryOperationStatusMonitoring(
  params: {
    trainCode: string,
    coachCode: string
  }

) {
  return request<OperationStatusMonitoringDataType>(
    `/api/subsystem/traction/state_diagram/${params.trainCode}/${params.coachCode}`,
    {
      method: "GET",
      ...params
    }
  );
}

export async function queryOperationStatus(
  params: {
    trainCode: string,
    coachCode: string
  }

) {
  return request<OperationStatusDataType>(
    `/api/subsystem/traction/state_diagram/${params.trainCode}/${params.coachCode}`,
    {
      method: "GET",
      ...params
    }
  );
}

export async function queryTractionStateParameters(
  params: {
    trainCode: string,
    coachCode: string
  }

) {
  return request<TractionStateParametersDataType>(
    `/api/subsystem/traction/status_table/${params.trainCode}/${params.coachCode}`,
    {
      method: "GET",
      ...params
    }
  );
}

export async function queryFaultHistogram(
  params: {
    trainCode: string,
    startTime: string,
    endTime: string
  }

) {
  return request(
    `/api/subsystem/traction/fault_histogram/${params.trainCode}`,
    {
      params: { startTime: params.startTime, endTime: params.endTime },
    }
  );
}
export async function queryFaultPie(
  params: {
    trainCode: string,
    startTime: string,
    endTime: string
  }

) {
  return request(
    `/api/subsystem/traction/fault_pie/${params.trainCode}`,
    {
      params: { startTime: params.startTime, endTime: params.endTime },
    }
  );
}

export async function queryFaultInfo(
  params: {
    trainCode: string,
    startTime: string,
    endTime: string,
    pageNo: number,
    pageSize: number,
  }

) {
  return request(
    `/api/subsystem/traction/fault_message/${params.trainCode}`,
    {
      params: {
        startTime: params.startTime,
        endTime: params.endTime, pageNo: params.pageNo, pageSize: params.pageSize,
      },
    }
  );
}

