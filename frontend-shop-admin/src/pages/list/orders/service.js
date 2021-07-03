import request from '../../../utils/request';

export async function queryItem(params) {
  const requestApi = request();
  return requestApi('/order', {
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

export async function updateOrder(params) {
  const requestApi = request();
  return requestApi('/order', {
    method: 'PUT',
    data: { ...params, method: 'update' },
  });
}
