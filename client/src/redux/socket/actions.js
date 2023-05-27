import { SocketActionTypes } from './types';

export const followUser = (data) => ({
  type: SocketActionTypes.FOLLOW_USER,
  payload: { data }
});

export const unFollowUser = (data) => ({
  type: SocketActionTypes.UNFOLLOWER_USER,
  payload: { data }
});

export const openNewSocket = () => ({
  type: SocketActionTypes.OPEN_NEW_SOCKET
});

export const closeCurrentSocket = () => ({
  type: SocketActionTypes.CLOSE_CURRENT_SOCKET
});
