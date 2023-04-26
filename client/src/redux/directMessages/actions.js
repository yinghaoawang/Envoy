import { DirectMessageActionTypes } from './types';

export const setDirectMessages = (data) => ({
  type: DirectMessageActionTypes.SET_DIRECT_MESSAGES,
  payload: { data }
});

export const loadDirectMessages = () => ({
  type: DirectMessageActionTypes.LOAD_DIRECT_MESSAGES
});

export const directMessageSuccess = () => ({
  type: DirectMessageActionTypes.RES_SUCCESS
});

export const directMessageError = (error) => ({
  type: DirectMessageActionTypes.RES_ERROR,
  payload: { error }
});

export const resetDirectMessageState = () => ({
  type: DirectMessageActionTypes.RESET_STATE
});
