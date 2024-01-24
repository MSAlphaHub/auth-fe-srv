import { createSlice } from '@reduxjs/toolkit';

// import { Table } from 'utils/helpers/table';

import { login } from './auth.action';
const initialState: Types.IAuthState = {
  actionType: '',
  loading: false,
};

const LoginSlice = createSlice({
  name: 'auth/login',
  initialState,
  reducers: {
    // resetWorkStandardStore: () => initialState,
  },
  extraReducers: (builder) => {
    // auth login
    builder.addCase(login.pending, (state, action) => {
      state.loading = true;
      state.actionType = action.type;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.actionType = action.type;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.actionType = action.type;
    });
  },
});
// export const { resetWorkStandardStore } = LoginSlice.actions;
export default LoginSlice.reducer;
