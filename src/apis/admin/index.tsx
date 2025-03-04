import { Modal } from 'antd';
import axios, { AxiosResponse } from 'axios';

const API_BASE_URL = process.env.API_GATEWAY;
const apiAdmin = axios.create({
  baseURL: API_BASE_URL,
});

apiAdmin.interceptors.request.use(
  (config) => {
    // const stringifiedToken = localStorage.getItem(ACCESS_TOKEN_KEY) || '';
    // const token = stringifiedToken !== '' ? JSON.parse(stringifiedToken) : '';
    // const bearerToken = jwtHelper.getBearerToken(token);

    if (config.headers) {
      // config.headers['Authorization'] = bearerToken;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
apiAdmin.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error?.response?.status === 401) {
      Modal.error({
        title: 'アクティブなセッションの有効期限が切れました。',
        onOk: () => {
          localStorage.clear();
          window.location.href = '/login';
        },
      });
    }
    // error common
    if (error?.response?.status === 403) {
      // Modal.error({
      //   title: convertMessageErr(error?.response?.data?.errors[0]?.code),
      //   onOk: () => {
      //     localStorage.clear();
      //     window.location.href = '/login';
      //   },
      // });
    }
    return Promise.reject(error);
  },
);

export default apiAdmin;
