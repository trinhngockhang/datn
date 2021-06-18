import request from '../../../utils/request';
export async function fakeRegister(params) {
  const requestApi = request();

  console.log(params);
  return requestApi('/auth/sign-up', {
    method: 'POST',
    data: { user: params },
  });
}
