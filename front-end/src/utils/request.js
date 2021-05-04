/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { notification } from 'antd';
import { configApi } from '../config';
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: 'Bad Request',
  401: 'UnAuthorize',
  403: 'Forbid',
  404: 'Not found',
  406: '请求的格式不可得。',
  409: 'Existed record',
  410: '410。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: 'Lỗi server',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
/**
 * 异常处理程序
 */

const errorHandler = (error) => {
  const { response } = error;

  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    if(status == 401){
      localStorage.removeItem('token');
      window.location='/user/login';
    }
    notification.error({
      message: `Status ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: 'Lỗi mạng',
      message: 'Lỗi mạng',
    });
  }

  return response;
};
/**
 * 配置request请求时的默认参数
 */

const request = () => {
  const token = localStorage.getItem('token');
  return extend({
    errorHandler,
    headers:{
      Authorization: 'Bearer '+ token,
    },
    prefix: configApi,
  });
}
export default request;
