import { AuthLoginActionTypes } from './types';

export const authLoginApiResponseSuccess = (actionType, data) => ({
  type: AuthLoginActionTypes.API_RESPONSE_SUCCESS,
  payload: { actionType, data }
});

export const authLoginApiResponseError = (actionType, error) => ({
  type: AuthLoginActionTypes.API_RESPONSE_ERROR,
  payload: { actionType, error }
});

export const loginUser = (user) => ({
  type: AuthLoginActionTypes.LOGIN_USER,
  payload: { user }
});

export const logoutUser = () => ({
  type: AuthLoginActionTypes.LOGOUT_USER
});
