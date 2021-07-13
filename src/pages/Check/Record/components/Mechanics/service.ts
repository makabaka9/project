import request from 'umi';

export async function submitForm(params: any) {
  return request('/api/forms', {
    method: 'POST',
    data: params,
  });
}
