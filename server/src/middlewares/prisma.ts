export {};
const cache = require('../cache');
const { prisma } = require('../helpers/prismaHelper');
const { filterPasswordKeys } = require('../helpers');

prisma.$use(async (params: any, next: any) => {
  const result = await next(params);

  let cacheArray = null;
  switch (params.model) {
    case 'User':
      cacheArray = cache.users;
      break;
    case 'Channel':
      cacheArray = cache.channels;
      break;
    default:
      throw new Error('Unrecognized model name in prisma socket.io middleware');
  }

  switch (params.action) {
    case 'create':
      cacheArray.push(filterPasswordKeys(result));
      break;
    case 'update':
      const elementIndex = cacheArray.findIndex((e: any) => e.id === result.id);
      if (elementIndex === -1) {
        throw new Error(
          'Cache could not find element with matching id in update middleware.'
        );
      }
      cacheArray[elementIndex] = filterPasswordKeys(result);
      break;
  }

  return result;
});
