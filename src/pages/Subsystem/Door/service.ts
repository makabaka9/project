import request from 'umi-request';

export async function queryBasicProfile() {
  return request('/api/profile/basic');
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
      `/api/subsystem/door/fault_message/${params.trainCode}`,
      {
        params: {
          startTime: params.startTime,
          endTime: params.endTime, pageNo: params.pageNo, pageSize: params.pageSize,
        },
      }
  );
}

export async function queryFaultStatus(
  params: {
    trainCode: string
  }

) {
return request(
    `/api/subsystem/door/train_status/${params.trainCode}`,
    {
      params: {},
    }
);
}

export async function queryDoorStatus(
  params: {
    trainCode: string
    coachCode: string
  }

) {
return request(
    `/api/subsystem/door/status_table/${params.trainCode}/${params.coachCode}`,
    {
      params: {},
    }
);
}