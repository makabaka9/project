import request from 'umi-request';
import { TrainsMonitorType, TrainBasicInfoType, OperationStatusDataType } from './data.d';

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

export async function querytrainBasicInfo(
  params: {
    trainCode: string
  }
) {
  return request<TrainBasicInfoType>(
    `/api/monitor/train/basic_info/${params.trainCode}`,
    {
      method: "GET",
    }
  );
}

// 重要参数接口
export async function querytrainImportantStatus(
  params: {
    trainCode: string
  }
) {
  return request(
    `/api/monitor/train/important_status/${params.trainCode}`,
    {
      method: "GET",
    }
  );
}

// 轴温系统接口
export async function querytrainAxleStatus(
  params: {
    trainCode: string
  }
) {
  return request(
    `/api/subsystem/axle/train_status/${params.trainCode}`,
    {
      method: "GET",
    }
  );
}

// 烟火报警系统接口
export async function querytrainFireStatus(
  params: {
    trainCode: string
  }
) {
  return request(
    `/api/subsystem/fire/train_status/${params.trainCode}`,
    {
      method: "GET",
    }
  );
}

// 主动式障碍物检测系统接口
export async function querytrainAdosStatus(
  params: {
    trainCode: string
  }
) {
  return request(
    `/api/subsystem/aods/train_status/${params.trainCode}`,
    {
      method: "GET",
    }
  );
}

// 空调系统接口
export async function querytrainHavcStatus(
  params: {
    trainCode: string
  }
) {
  return request(
    `/api/subsystem/hvac/train_status/${params.trainCode}`,
    {
      method: "GET",
    }
  );
}

// 制动系统接口
export async function queryBrakeStatus(
  params: {
    trainCode: string
  }
) {
  return request(
    `/api/subsystem/brake/train_status/${params.trainCode}`,
    {
      method: "GET",
    }
  );
}

// 牵引系统接口
export async function queryTractionStatus(
  params: {
    trainCode: string
  }
) {
  return request(
    `/api/subsystem/traction/train_status/${params.trainCode}`,
    {
      method: "GET",
    }
  );
}


// 辅助系统接口
export async function queryAuxiliaryStatus(
  params: {
    trainCode: string
  }
) {
  return request(
    `/api/subsystem/auxiliary/train_status/${params.trainCode}`,
    {
      method: "GET",
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