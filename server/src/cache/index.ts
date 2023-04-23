export {};
import type { SocketUser, User, Channel, AppSocket } from '../types';
const { prisma } = require('../helpers/prismaHelper');
const { filterPasswordKeys } = require('../helpers');

const onlineUsers: SocketUser[] = [];

const users: User[] = [];

const channels: Channel[] = [];

function connectUser(socket: AppSocket, user: User) {
  const socketUser = {
    socketId: socket.id,
    user
  };
  const existingUser = onlineUsers.find((u) => u.socketId === socket.id);
  if (existingUser != null)
    throw new Error('User already exists in connect socket user');
  onlineUsers.push(socketUser);
}

function disconnectUser(socket: AppSocket) {
  const index = onlineUsers.findIndex((u) => u.socketId === socket.id);
  if (index === -1) throw new Error('User not found in disconnect socket user');
  onlineUsers.splice(index, 1);
}

function addUser(user: User) {
  users.push(user);
}

function addUsers(newUsers: User[]) {
  users.push(...newUsers);
}

function addChannel(channel: Channel) {
  channels.push(channel);
}

function addChannels(newChannels: Channel[]) {
  channels.push(...newChannels);
}

function init() {
  const loadUsers = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const dbUsers = await prisma.user.findMany();
        addUsers([...filterPasswordKeys(dbUsers)]);
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
        addChannels([...filterPasswordKeys(dbChannels)]);
        resolve(channels);
      } catch (error) {
        reject(error);
      }
    });
  };

  Promise.all([loadUsers(), loadChannels()]).catch((error) => {
    throw new Error(error);
  });
}

module.exports = {
  users,
  channels,
  init,
  onlineUsers,
  connectUser,
  disconnectUser,
};
