import { combineReducers, configureStore } from '@reduxjs/toolkit';

import authReducer from './auth/auth.reducer';

// const rootReducer = combineReducers<Types.IStoreState>({
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const rootReducer = combineReducers<Types.IStoreState>({
  auth: authReducer,
});

const store = configureStore({ reducer: rootReducer });

// Inferred type
export type AppDispatch = typeof store.dispatch;

export default store;
