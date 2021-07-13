import request from 'umi-request';

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTrainList(params: any) {
  return request('/api/monitor/fault', {
    params,
  });
}

export async function querySysList() {
  return request('/api/monitor/fault/fault_subsystem', {
    method: 'GET',
    // params,
  });
}

export async function queryTarget(params: any) {
  return request('/api/monitor/fault/by_time', {
    method: 'GET',
    params,
  });
}

export async function queryFaultstatistics() {
  return request('/api/monitor/fault/fault_statistics', {
    method: 'GET',
    // params,
  });
}

export async function queryFaultSubsystem() {
  return request('/api/monitor/fault/by_subsystem', {
    method: 'GET',
    // params,
  });
}

export async function queryCurrentDir() {
  return request('/api/monitor/fault/online_train', {
    method: 'GET',
    // params,
  });
}

export async function queryFaultRate() {
  return request('/api/monitor/fault/fault_rate/by_month', {
    method: 'GET',
    // params,
  });
}
export async function queryReliability() {
  return request('/api/monitor/fault/count/by_month', {
    method: 'GET',
    // params,
  });
}

export async function queryTotalMileage() {
  return request('/api/statistics/mile/total_mileage', {
    method: 'GET',
    // params,
  });
}

export async function stateInformation(params:any) {
  return request('/api/monitor/state', {
    method: 'GET',
    params
  });
}
