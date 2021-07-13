import request from "umi-request";
import { MonitorDataType, TemperatureEnergyDataType } from "./data.d";

// 运行状态监控
export async function queryMonitor(
  params: {
    trainCode: string,
    coachCode: string
  }

) {
  return request<Array<object>>(
    `/api/subsystem/hvac/status_table/${params.trainCode}/${params.coachCode}`,
    {
      method: "GET",
      // data: { coachCode: params.coachCode },
      ...params
    }
  );
}

// 温度能耗
export async function queryTemperatureEnergy(
  params: {
    trainCode: string,
    coachCode: string,
  }

) {
  return request<TemperatureEnergyDataType>(
    `/api/subsystem/hvac/state_diagram/${params.trainCode}/${params.coachCode}`,
    {
      method: "GET",
      ...params
    }
  );
}

// 故障统计
export async function queryFaultNumber(
  params: {
    trainCode: string,
    startTime: string,
    endTime: string
  }
) {
  return request(
    `/api/subsystem/hvac/fault_num_list/${params.trainCode}`,
    {
      data: { startTime: params.startTime, endTime: params.endTime },
    }
  );
}

// 故障信息
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
    `/api/subsystem/hvac/fault_message/${params.trainCode}`,
    {
      params: {
        startTime: params.startTime,
        endTime: params.endTime, pageNo: params.pageNo, pageSize: params.pageSize,
      },
    }
  );
}