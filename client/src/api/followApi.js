import { api } from './apiCore';
import * as url from './urls';

function getUserFollows(userId) {
  return new Promise(async (resolve, reject) => {
    try {
      const { followers, following } = await api.get(
        url.FOLLOWS + '/' + userId
      );
      resolve({ followers, following });
    } catch (error) {
      reject(error);
    }
  });
}

const followApi = {
  getUserFollows
};

export default followApi;
