import request from 'umi-request';
import { TrainsMonitorType, subsystemDataType } from './data';

export async function querytrainMonitor(
  params: {
    trainCode: string
  }
) {
  return request<TrainsMonitorType>(
    `/api/monitor/train/train_monitor/${params.trainCode}`,
    {
      method: "GET",
    }
  );
}

export async function subSystemMonitor(
  params: {
    trainCode: string,
    sysName: string
  }
) {
  return request<subsystemDataType>(
    `/api/monitor/train/train_subsystem/${params.trainCode}`,
    {
      method: "GET",
      data: { sysName: params.sysName },
    }
  );
}
