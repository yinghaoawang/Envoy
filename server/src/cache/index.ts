export {};
import type {
  SocketUser,
  User,
  AppSocket,
} from '../types';

const onlineUsers: SocketUser[] = [];

function connectUser(socket: AppSocket, user: User) {
  const socketUser = {
    socketId: socket.id,
    user
  };
  const existingUser = onlineUsers.find((u) => u.socketId === socket.id);
  if (existingUser != null) {
    throw new Error('Socket id already exists in connect socket user');
  }
  onlineUsers.push(socketUser);
}

function disconnectUser(socket: AppSocket) {
  const index = onlineUsers.findIndex((u) => u.socketId === socket.id);
  if (index === -1) {
    throw new Error('User not found in disconnect socket user');
  }
  onlineUsers.splice(index, 1);
}

function init() {
  
}

module.exports = {
  init,
  onlineUsers,
  connectUser,
  disconnectUser
};
