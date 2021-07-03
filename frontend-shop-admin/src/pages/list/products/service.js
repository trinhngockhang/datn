import request from '../../../utils/request';

export async function queryItem(params) {
  const requestApi = request();
  return requestApi('/item', {
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
export async function updateTemplate(params) {
  const requestApi = request();
  return requestApi('/item/'+params.id, {
    method: 'PUT',
    data: { ...params, method: 'update' },
  });
}
