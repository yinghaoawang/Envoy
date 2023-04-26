import { api } from './apiCore';
import * as url from './urls';

function getDirectMessages() {
  return new Promise(async (resolve, reject) => {
    try {
      const directMessages = await api.get(url.GET_DIRECT_MESSAGES);
      resolve(directMessages);
    } catch (error) {
      reject(error);
    }
  });
}

const directMessageApi = {
  getDirectMessages
};

export default directMessageApi;
