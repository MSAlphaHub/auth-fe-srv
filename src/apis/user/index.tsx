import { BASE_API_URL } from '@utils/constants/endpoint';
import { getLocalStorage, STORAGE } from '@utils/helpers';
import { getBearerToken } from '@utils/helpers/auth';
import axios, { AxiosResponse } from 'axios';
import configs from 'config';

const apiUser = axios.create({
  baseURL: configs.apiGateway,
});

const refreshAccessToken = async (): Promise<any> => {
  const refreshToken = getLocalStorage(STORAGE.USER_REFRESH);
  const data = {
    refresh_token: refreshToken,
  };
  return await apiUser.post(BASE_API_URL.REFRESH_TOKEN, data);
};

apiUser.interceptors.request.use(
  (config) => {
    const accessToken = getLocalStorage(STORAGE.USER_TOKEN);
    if (!accessToken) {
      throw new Error('Your access token is null');
    }
    const bearerToken = getBearerToken(accessToken);

    if (config.headers) {
      config.headers['Authorization'] = bearerToken;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiUser.interceptors.response.use(
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

export default apiUser;
