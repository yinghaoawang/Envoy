import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

prisma.$use(async (params: any, next: any) => {
  const result = await next(params);
  return result;
});

module.exports = {
  prisma
};
