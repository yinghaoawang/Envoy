export {};
import type {
  SocketUser,
  User,
  Channel,
  AppSocket,
  DirectMessageChat
} from '../types';
const { prisma } = require('../helpers/prismaHelper');
const { filterPasswordKeys } = require('../helpers');

const onlineUsers: SocketUser[] = [];

const users: User[] = [];

const channels: Channel[] = [];


const directMessageChats: DirectMessageChat[] = [];

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

  const loadDirectMessageChats = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const dbDirectMessageChats = await prisma.directMessageChat.findMany({
          include: {
            users: true,
            messages: true
          }
        });
        directMessageChats.push(...filterPasswordKeys(dbDirectMessageChats));
        resolve(directMessageChats);
      } catch (error) {
        reject(error);
      }
    });
  };

  Promise.all([loadUsers(), loadChannels(), loadDirectMessageChats()]).catch(
    (error) => {
      throw new Error(error);
    }
  );
}

module.exports = {
  users,
  channels,
  directMessageChats,
  init,
  onlineUsers,
  connectUser,
  disconnectUser
};
