import { AuthActionTypes } from './types';

export const authSuccess = (actionType) => ({
  type: AuthActionTypes.AUTH_SUCCESS,
  payload: { actionType }
});

export const authError = (actionType, error) => ({
  type: AuthActionTypes.AUTH_ERROR,
  payload: { actionType, error }
});

export const registerUser = (user) => ({
  type: AuthActionTypes.REGISTER_USER,
  payload: { user }
});

export const loginUser = (user) => ({
  type: AuthActionTypes.LOGIN_USER,
  payload: { user }
});

export const logoutUser = () => ({
  type: AuthActionTypes.LOGOUT_USER
});

export const resetAuthState = () => ({
  type: AuthActionTypes.RESET_STATE
});
