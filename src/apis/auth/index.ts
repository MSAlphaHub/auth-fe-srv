import axios, { AxiosResponse } from 'axios';
import configs from 'config';

const apiAuth = axios.create({
  baseURL: configs.apiGateway,
});

apiAuth.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error?.response?.status === 401) {
      // Modal.error({
      //   title: 'The session has expired.',
      //   onOk: () => {
      //     localStorage.clear();
      //     window.location.href = '/login';
      //   },
      // });
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

export default apiAuth;
