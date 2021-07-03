import request from '../../../utils/request';

export async function queryItem(params) {
  const requestApi = request();
  return requestApi('/shop', {
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

export async function setAds(id) {
  const requestApi = request();
  return requestApi('/shop/ads/'+id, {
    method: 'PUT',
    data: {  method: 'put' },
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
