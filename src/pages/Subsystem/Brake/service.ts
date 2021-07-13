import request from 'umi-request';
import { BrakingForceDataType, BrakeOperationStatusMonitoringDataType } from './data';

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryBrakingForce(
  params: {
    trainCode: string,
    coachCode: string
  }

) {
  return request<BrakingForceDataType>(
    `/api/subsystem/brake/state_diagram/${params.trainCode}/${params.coachCode}`,
    {
      method: "GET",
    }
  );
}

export async function queryBrakeOperationStatusMonitoring(
  params: {
    trainCode: string,
    coachCode: string
  }

) {
  return request<BrakeOperationStatusMonitoringDataType>(
    `/api/subsystem/brake/status_table/${params.trainCode}/${params.coachCode}`,
    {
      method: "GET",
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
    `/api/subsystem/brake/fault_histogram/${params.trainCode}`,
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
    `/api/subsystem/brake/fault_pie/${params.trainCode}`,
    {
      params: { startTime: params.startTime, endTime: params.endTime },
    }
  );
}

export async function queryFaultInfo(
  params: {
    trainCode: string,
    startTime: string,
    endTime: string
    pageNo: number,
    pageSize: number,
  }

) {
  return request(
    `/api/subsystem/brake/fault_message/${params.trainCode}`,
    {
      params: { startTime: params.startTime, endTime: params.endTime, pageNo: params.pageNo, pageSize: params.pageSize, },
    }
  );
}
