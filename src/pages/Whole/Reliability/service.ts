import request from 'umi-request';

export async function queryWholeMTBF(params: {
  trainCode: string;
  startTime: Date;
  endTime: Date;
}) {
  return request(`/api/vehicle/analysis/reliability/train_mtbf/${params.trainCode}/by_time`, {
    // method: "POST",
    data: { startTime: params.startTime, endTime: params.endTime },
  });
}

export async function querySubsystemFaultLevel(params: {
  trainCode: string;
  subSystemCode: string;
  startTime: Date;
  endTime: Date;
}) {
  return request(
    `/api/vehicle/analysis/reliability/level_fault/${params.trainCode}/${params.subSystemCode}/by_time`,
    {
      // method: "POST",
      data: { startTime: params.startTime, endTime: params.endTime },
    },
  );
}

export async function querySubsystemFaultLevelRate(params: {
  trainCode: string;
  subSystemCode: string;
  startTime: Date;
  endTime: Date;
}) {
  return request(
    `/api/vehicle/analysis/reliability/level_failure_rate/${params.trainCode}/${params.subSystemCode}/by_time`,
    {
      // method: "POST",
      data: { startTime: params.startTime, endTime: params.endTime },
    },
  );
}
export async function queryAvgMTBF(params: {
  trainCode: string;
  subSystemCode: string;
  startTime: Date;
  endTime: Date;
}) {
  return request(
    `/api/vehicle/analysis/reliability/mtbf/${params.trainCode}/${params.subSystemCode}/by_time`,
    {
      // method: "POST",
      data: {
        startTime: params.startTime,
        endTime: params.endTime,
        subSystemCode: params.subSystemCode,
      },
    },
  );
}
export async function queryAvgMDBF(params: {
  trainCode: string;
  subSystemCode: string;
  startTime: Date;
  endTime: Date;
}) {
  return request(
    `/api/vehicle/analysis/reliability/mdbf/${params.trainCode}/${params.subSystemCode}/by_time`,
    {
      // method: "POST",
      data: { startTime: params.startTime, endTime: params.endTime },
    },
  );
}

export async function queryWholeFaultLevelMTBF(params: {
  trainCode: string;
  subSystemCode: string;
  startTime: Date;
  endTime: Date;
}) {
  return request(
    `/api/vehicle/analysis/reliability/level_mtbf/${params.trainCode}/${params.subSystemCode}/by_time`,
    {
      // method: "POST",
      data: { startTime: params.startTime, endTime: params.endTime },
    },
  );
}

export async function queryReliability(params: {
  trainCode: string;
  subSystemCode: string;
  startTime: Date;
  endTime: Date;
}) {
  return request(`/api/vehicle/analysis/reliability/grade/${params.trainCode}/by_time`, {
    data: { startTime: params.startTime, endTime: params.endTime },
  });
}
