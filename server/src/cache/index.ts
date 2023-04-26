export {};
import type { SocketUser, User, Channel, AppSocket, DirectMessage } from '../types';
const { prisma } = require('../helpers/prismaHelper');
const { filterPasswordKeys } = require('../helpers');

const onlineUsers: SocketUser[] = [];

const users: User[] = [];

const channels: Channel[] = [];

const directMessages: DirectMessage[] = [];

function connectUser(socket: AppSocket, user: User) {
  const socketUser = {
    socketId: socket.id,
    user
  };
  const existingUser = onlineUsers.find((u) => u.socketId === socket.id);
  if (existingUser != null)
    throw new Error('Socket id already exists in connect socket user');
  onlineUsers.push(socketUser);
}

function disconnectUser(socket: AppSocket) {
  const index = onlineUsers.findIndex((u) => u.socketId === socket.id);
  if (index === -1) throw new Error('User not found in disconnect socket user');
  onlineUsers.splice(index, 1);
}

function init() {
  const loadUsers = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const dbUsers = await prisma.user.findMany();
        users.push(...filterPasswordKeys(dbUsers));
        resolve(users);
      } catch (error) {
        reject(error);
      }
    });
  };

  const loadChannels = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const dbChannels = await prisma.channel.findMany({
          include: {
            owner: true,
            users: {
              include: {
                user: true
              }
            }
          }
        });
        channels.push(...filterPasswordKeys(dbChannels));
        resolve(channels);
      } catch (error) {
        reject(error);
      }
    });
  };

  const loadDirectMessages = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const dbDirectMessages = await prisma.directMessage.findMany({
          include: {
            from: true,
            to: true
          }
        });
        directMessages.push(...filterPasswordKeys(dbDirectMessages));
        resolve(directMessages);
      } catch (error) {
        reject(error);
      }
    });
  };

  Promise.all([loadUsers(), loadChannels(), loadDirectMessages()]).catch((error) => {
    throw new Error(error);
  });
}

module.exports = {
  users,
  channels,
  directMessages,
  init,
  onlineUsers,
  connectUser,
  disconnectUser,
};
