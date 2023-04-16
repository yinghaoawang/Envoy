import { AuthActionTypes } from './types';

export const authSuccess = () => ({
  type: AuthActionTypes.RES_SUCCESS,
});

export const authError = (error) => ({
  type: AuthActionTypes.RES_ERROR,
  payload: { error }
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
