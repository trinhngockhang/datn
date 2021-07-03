import request from '../../../utils/request';

export async function queryItem(params) {
  const requestApi = request();
  return requestApi('/category', {
    params,
  });
}

export async function createTemplate(params) {
  const requestApi = request();
  return requestApi('/templates', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}

export async function removeTemplate(id) {
  const requestApi = request();
  return requestApi('/templates/' + id, {
    method: 'DELETE',
  });
}
export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}
export async function setStatus(id) {
  const requestApi = request();
  return requestApi('/category/active/' + id, {
    method: 'PUT',
    data: { method: 'update' },
  });
}
