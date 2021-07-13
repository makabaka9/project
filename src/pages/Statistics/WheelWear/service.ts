import request from 'umi-request';

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryMileData(params: any) {
  return request('/api/statistics/mile/type_mile',{
    method: 'GET',
    params,
  });
}

export async function queryMileYearData(params: any) {
  return request('/api/statistics/mile/mile_year',{
    method: 'GET',
    params,
  });
}

export async function queryMileToprData(params: any) {
  return request('/api/statistics/mile/top_ten_month_miles',{
    method: 'GET',
    params,
  });
}

export async function queryMileListrData(params: any) {
  return request('/api/statistics/mile/mile_list',{
    method: 'GET',
    params,
  });
}