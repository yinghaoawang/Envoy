import { ProfileActionTypes } from './types';

export const setUser = (user) => ({
  type: ProfileActionTypes.SET_USER,
  payload: { user }
});