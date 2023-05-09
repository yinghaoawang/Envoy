import { DirectMessageActionTypes } from './types';

export const setChats = (data) => ({
  type: DirectMessageActionTypes.SET_CHATS,
  payload: { data }
});

export const setCurrentChat = (data) => ({
  type: DirectMessageActionTypes.SET_CURRENT_CHAT,
  payload: { data }
});

export const loadChats = () => ({
  type: DirectMessageActionTypes.LOAD_CHATS
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
