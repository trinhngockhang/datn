import request from 'umi-request';
export async function queryCurrent() {
  return request('/sites');
}
export async function queryFakeList(params) {
  return request('/api/fake_list', {
    params,
  });
}
