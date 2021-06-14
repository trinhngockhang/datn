import request from '../../../utils/request';

export async function queryItem(params) {
  const requestApi = request();
  return requestApi('/items', {
    params,
  });
}

export async function syncDataToPlatform(params) {
  const requestApi = request();
  return requestApi('/sites/sync', {
    method: 'POST',
    params,
  });
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: { ...params, method: 'delete' },
  });
}
export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}
export async function updateRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: { ...params, method: 'update' },
  });
}
