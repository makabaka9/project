import request from 'umi-request';

export async function querytrainEnergy(params:any) {
  return request('/api/energy/manage/unitEnergyConsumption', {
    method: 'GET',
    params,
  });
}
