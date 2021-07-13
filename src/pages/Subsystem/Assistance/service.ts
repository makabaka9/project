import request from 'umi-request';
import { BatteryVoltageDataType, AuxiliaryStatusDataDataType, FaultHistogramDataType } from './data';

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

// export async function queryBatteryTemperature(
//   params: {
//     trainCode: string,
//     coachCode: string
//   }

// ) {
//   return request<BatteryTemperatureDataType>(
//     `/api/subsystem/auxiliary/battery_temperature_trend/${params.trainCode}/${params.coachCode}`,
//     {
//       method: "GET",
//     }
//   );
// }

//蓄电池温度和电压
export async function queryBatteryVoltage(
  params: {
    trainCode: string,
    coachCode: string
  }

) {
  return request<BatteryVoltageDataType>(
    `/api/subsystem/auxiliary/state_diagram/${params.trainCode}/${params.coachCode}`,
    {
      method: "GET",
    }
  );
}

export async function queryAuxiliaryStatusData(
  params: {
    trainCode: string,
    coachCode: string
  }

) {
  return request<AuxiliaryStatusDataDataType>(
    `/api/subsystem/auxiliary/status_table/${params.trainCode}/${params.coachCode}`,
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
  return request<FaultHistogramDataType>(
    `/api//subsystem/auxiliary/fault_histogram/${params.trainCode}`,
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
    `/api/subsystem/auxiliary/fault_pie/${params.trainCode}`,
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
    `/api/subsystem/auxiliary/fault_message/${params.trainCode}`,
    {
      params: {
        startTime: params.startTime,
        endTime: params.endTime, pageNo: params.pageNo, pageSize: params.pageSize,
      },
    }
  );
}