import { ProfileActionTypes } from './types';

export const setUser = (user) => ({
  type: ProfileActionTypes.SET_USER,
  payload: { user }
});

export const updateUser = (data) => ({
  type: ProfileActionTypes.UPDATE_USER,
  payload: { data }
});

export const profileSuccess = () => ({
  type: ProfileActionTypes.RES_SUCCESS
});

export const profileError = (error) => ({
  type: ProfileActionTypes.RES_ERROR,
  payload: { error }
});

export const resetProfileState = () => ({
  type: ProfileActionTypes.RESET_STATE
});
