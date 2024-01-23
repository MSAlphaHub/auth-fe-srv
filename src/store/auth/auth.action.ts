import { createAsyncThunk } from '@reduxjs/toolkit';

import apiUser from '../../apis/user';
// import { AxiosError, AxiosResponse } from 'axios';
import { BASE_API_URL } from '../../apis/endpoint';
// import { objectToQueryString } from 'utils/request';

export const login = createAsyncThunk(
  'auth/login',
  async (payload: Types.ILoginRequest, { rejectWithValue }) => {
    try {
      const response = await apiUser.post<Types.ILoginResponse>(BASE_API_URL.LOGIN, payload);

      return {
        data: response.data,
      };
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
  },
);
