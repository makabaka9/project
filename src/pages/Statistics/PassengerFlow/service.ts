import request from 'umi-request';
import { PassengerFlowDayTop5DataType } from './data';

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryPassengerStatistic(
  params: {
    startTime: string,
    endTime: string,
  }
) {
  return request(
    `/api/statistics/passengerflow/passenger_flow_station`,
    {
      params,
    }
  );
}
export async function queryPassengerFlowDay(
  params: {
    startTime: string,
    endTime: string,
  }
) {
  return request(
    '/api/statistics/passengerflow/passenger_flow_max_min',
    {
      params,
    }
  );
}

export async function queryPassengerFlowDayTop5(
  params: {
    startTime: string,
    endTime: string,
  }
) {
  return request(
    '/api/statistics/passengerflow/passenger_flow_station_time',
    {
      params,
    }
  );
}

export async function queryPassengerFlowYear(
  params: {
    startTime: string,
    endTime: string,
  }
) {
  return request(
    '/api/statistics/passengerflow/passenger_flow_month',
    {
      params,
    }
  );
}

export async function queryPassengerFlowDayBottom(
  params: {
    startTime: string,
    endTime: string,
  }
) {
  return request(
    '/api/statistics/passengerflow/passenger_flow_station_max',
    {
      params,
    }
  );
}


