import request from '../../../utils/request';

export async function queryList(params) {
  const requestApi = request();

  return requestApi('/sites', {
    params,
  });
}
export async function removeFakeList(params) {
  const { count = 5, ...restParams } = params;
  const requestApi = request();
  return requestApi('/sites/delete', {
    method: 'PUT',
    params: {
      count,
    },
    data: { ...restParams, method: 'delete' },
  });
}
export async function addList(params) {
  const requestApi = request();
  const { count = 5, ...restParams } = params;
  return requestApi('/sites', {
    method: 'POST',
    data: { ...restParams, method: 'post' },
  });
}
export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params;
  const requestApi = request();
  return requestApi('/sites', {
    method: 'PUT',
    data: { ...restParams, method: 'update' },
  });
}
