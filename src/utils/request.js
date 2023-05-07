import axios from 'axios';
import { Message } from 'element-ui';

const service = axios.create({
  //baseURL: 'http://172.16.102.33:9096/ysp/',
  // baseURL: 'http://172.20.10.6:1919/dczlxt/',
  baseURL: 'http://localhost:1919/dczlxt/',
  //withCredentials: true, // send cookies when cross-domain requests
  timeout: 30000
});

service.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    const res = response.data;
    if (response.status!==200) {
      error('状态码：'+response.status);
      return Promise.reject(new Error(res.message || 'Error'));
    } else {
      return res;
    }
  },
  error => {
    error('状态码：error');
    return Promise.reject(error);
  }
);

const error = (msg) => {
  Message({
    message: msg || 'Error',
    type: 'error',
    duration: 5 * 1000
  });
};

export default service;