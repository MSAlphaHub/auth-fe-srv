import { createAsyncThunk } from '@reduxjs/toolkit';

import apiAuth from '@apis/auth';
// import { AxiosError, AxiosResponse } from 'axios';
import { BASE_API_URL } from '@utils/constants/endpoint';
import { setLocalStorage, STORAGE } from '@utils/helpers';
// import { objectToQueryString } from 'utils/request';

export const login = createAsyncThunk(
  'auth/login',
  async (payload: Types.ILoginRequest, { rejectWithValue }) => {
    try {
      const response = await apiAuth.post<Types.ILoginResponse>(BASE_API_URL.LOGIN, payload);
      setLocalStorage(STORAGE.USER_TOKEN, response.data.data.tokens.access.token);
      setLocalStorage(STORAGE.USER_REFRESH, response.data.data.tokens.refresh.token);
      return {
        data: response.data,
      };
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  },
);
