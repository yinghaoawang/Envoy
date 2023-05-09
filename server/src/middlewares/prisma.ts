import { CacheAction } from '../types';

export {};
const cache = require('../cache');
const { filterPasswordKeys } = require('../helpers');

const updateCache = async (params: any, next: any) => {
  const payload = await next(params);

  let cacheAction: CacheAction = {
    array: null
  };

  switch (params.model) {
    case 'User':
      cacheAction.array = cache.users;
      break;
    case 'Channel':
      cacheAction.array = cache.channels;
      break;
    case 'DirectMessageChat':
      cacheAction.array = cache.directMessageChats;
      break;
    case 'DirectMessage':
      return handleDirectMessage(params.action, payload);
    default:
      throw new Error('Unrecognized model name in prisma socket.io middleware');
  }

  switch (params.action) {
    case 'create':
      cacheAction.array.push(filterPasswordKeys(payload));
      break;
    case 'update':
      const elementIndex: number = cacheAction.array.findIndex(
        (e: any) => e.id === payload.id
      );
      if (elementIndex === -1) {
        throw new Error(
          'Cache could not find element with matching id in update middleware.'
        );
      }
      cacheAction.array[elementIndex] = filterPasswordKeys(payload);
      break;
  }

  return payload;
};

const handleDirectMessage = (action: string, payload: any) => {
  switch (action) {
    case 'create':
      const chatIndex: number = cache.directMessageChats.findIndex(
        (c: any) => c.id === payload.chatId
      );
      if (chatIndex === -1) {
        throw new Error(
          'Cache could not find DM chat with matching id in create DM middleware.'
        );
      }
      cache.directMessageChats[chatIndex] = payload.chat;

      break;
    case 'update':
      console.error('Updated direct message yet implemented');
      break;
  }

  return payload;
};

module.exports = { updateCache };
