import { login } from './auth.action';
import { useCallback } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';

export const useWorkStandard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, actionType } = useSelector(
    (state: Types.IStoreState) => state.auth,
    shallowEqual,
  );
  const onLogin = useCallback(
    async (payload: Types.ILoginRequest) => {
      return await dispatch(login(payload));
    },
    [dispatch],
  );
  return {
    onLogin,
    loading,
    actionType,
  };
};
