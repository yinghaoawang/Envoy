export {};
import type { SocketUser, User, Channel } from '../types';
const { prisma } = require('../helpers/prismaHelper');
const { filterPasswordKeys } = require('../helpers');

const onlineUsers: SocketUser[] = [];

const users: User[] = [];

const channels: Channel[] = [];

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
        const dbChannels = await prisma.channel.findMany();
        channels.push(...filterPasswordKeys(dbChannels));
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
  onlineUsers
};
