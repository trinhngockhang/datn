import request from '../../../utils/request';
export async function fakeRegister(params) {
  const requestApi = request();

  console.log(params);
  return requestApi('/api/users', {
    method: 'POST',
    data: { user: params },
  });
}
