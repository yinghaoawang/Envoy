export {};
const { prisma } = require('../helpers/prismaHelper');
const { filterKeys } = require('../helpers');

const users: any[] = [];

const channels: any[] = [];

function init() {
  const loadUsers = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const dbUsers = await prisma.user.findMany();
        users.push(...dbUsers);
        resolve(users);
      } catch (error) {
        reject(error);
      }
    });
  };

  const loadChannels = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const dbChannels = await prisma.channel.findMany({});
        channels.push(...filterKeys(dbChannels, ['hashedPassword', 'salt']));
        resolve(channels);
      } catch (error) {
        reject(error);
      }
    });
  };

  Promise.all([loadUsers(), loadChannels()]).then((values) => {
    console.log('promise all: ', values);
  });
}

module.exports = {
  users,
  channels,
  init
};
