import { SocketActionTypes } from './types';

export const openNewSocket = () => ({
  type: SocketActionTypes.OPEN_NEW_SOCKET,
});

export const closeCurrentSocket = () => ({
  type: SocketActionTypes.CLOSE_CURRENT_SOCKET
})