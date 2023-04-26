const { PrismaClient } = require('@prisma/client');
const { updateCache } = require('../middlewares/prisma');

const prisma = new PrismaClient();

prisma.$use(updateCache);

module.exports = {
  prisma
};
