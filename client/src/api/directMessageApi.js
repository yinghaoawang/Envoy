import { api } from './apiCore';
import * as url from './urls';

function getDirectMessageChats() {
  return new Promise(async (resolve, reject) => {
    try {
      const directMessages = await api.get(url.GET_DIRECT_MESSAGES);
      resolve(directMessages);
    } catch (error) {
      reject(error);
    }
  });
}

function createSendMessage(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const directMessageChats = await api.post(url.CREATE_SEND_MESSAGE, data);
      resolve(directMessageChats);
    } catch (error) {
      reject(error);
    }
  });
}

const directMessageApi = {
  getDirectMessageChats, createSendMessage
};

export default directMessageApi;
