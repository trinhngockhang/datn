import axios from "axios";
import localStorage from "localStorage";
import * as useAction from '../redux/actions/userAction';
import { useSelector, useDispatch } from "react-redux";

const URL = { API: 'http://localhost:3003/' };
// const URL = { API: 'https://app-api.k-ecommerce.xyz/' };


export const axiosApiAuthen = async function (baseURL) {
  return new Promise(async (resolve, reject) => {
    const token = localStorage.getItem("token");
    const instance = axios.create({
      baseURL: baseURL ? baseURL : URL.API,
      headers: { authorization: `Bearer ${token}` },
      validateStatus: function (status) {
        return status < 500; // Reject only if the status code is greater than or equal to 500
      },
    });
    resolve(instance);
  });
};

export const getAuthen = async function (url, params, baseURL, cancelToken, getMe) {
  try {
    const axiosApi = await axiosApiAuthen(baseURL, cancelToken);
    const result = await axiosApi.get(url, {...params, cancelToken: cancelToken});
    if (result.status == 401) {
      localStorage.removeItem("token");
      if(!getMe)
      window.location = "/auth/login";
    }
    return result;
  } catch (e) {
    if (axios.isCancel(e)) {
    }
    if (e?.response?.status == 401) {
      localStorage.removeItem("token");
      if(!getMe)
      window.location = "/auth/login";
    }
    return Promise.reject(e);
  }
};

export const checkLogin = async function (url, params) {
  try {
    const axiosApi = await axiosApiAuthen();
    const result = await axiosApi.get(url, params);
    return result?.data?.code;
  } catch (e) {
    return false;
  }
};

export const postAuthen = async function (url, body) {
  try {
    const axiosApi = await axiosApiAuthen();
    const result = await axiosApi.post(url, body);
    if (result.status == 401) {
      localStorage.removeItem("token");
      window.location = "/auth/login";
    }
    return result;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const postAuthenWithBaseURL = async function (url, body, baseURL) {
  try {
    const axiosApi = await axiosApiAuthen(baseURL);
    const result = await axiosApi.post(url, body);
    if (result.status == 401) {
      localStorage.removeItem("token");
      window.location = "/auth/login";
    }
    return result;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const putAuthen = async function (url, body) {
  try {
    const axiosApi = await axiosApiAuthen();
    const result = await axiosApi.put(url, body);
    if (result.status === 401) {
      localStorage.removeItem("token");
      window.location = "/auth/login";
    }
    return result;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const deleteAuthen = async function (url, body) {
  try {
    const axiosApi = await axiosApiAuthen();
    const result = await axiosApi.delete(url, { data: body });
    if (result.status === 401) {
      localStorage.removeItem("token");
      window.location = "/auth/login";
    }
    return result;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const axiosApi = axios.create({
  baseURL: URL.API,
});
export const axiosLogin = async (input) => {
  var username = input.username;
  var password = input.password;
  var url = "/auth/login";
  var config = {
    method: "post",
    url,
    headers: {
      "Content-Type": "application/json",
    },
    data: { username, password },
  };
  try {
    const res = await axiosApi(config);
    localStorage.setItem("token", res.data.data.token);
    return res;
  } catch (e) {
    return false;
  }
};

export const axiosLoginGoogle = async (token) => {
  var url = "/auth/login-google";
  var config = {
    method: "post",
    url,
    headers: {
      "Content-Type": "application/json",
    },
    data: { token },
  };
  try {
    const res = await axiosApi(config);
    localStorage.setItem("token", res.data.data.token);
    console.log(res.data.data);
    return res.data.data;
  } catch (e) {
    return false;
  }
};