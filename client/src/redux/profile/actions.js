import { ProfileActionTypes } from './types';

export const setUser = (data) => ({
  type: ProfileActionTypes.SET_USER,
  payload: { data }
});

export const updateUser = (data) => ({
  type: ProfileActionTypes.UPDATE_USER,
  payload: { data }
});

export const profileSuccess = (success) => ({
  type: ProfileActionTypes.RES_SUCCESS,
  payload: { success }
});

export const profileError = (error) => ({
  type: ProfileActionTypes.RES_ERROR,
  payload: { error }
});

export const resetProfileState = () => ({
  type: ProfileActionTypes.RESET_STATE
});

export const resetProfileRestState = () => ({
  type: ProfileActionTypes.RESET_REST_STATE
});