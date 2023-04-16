import { api } from './apiCore';
import * as url from './urls';

function updateUser(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await api.post(url.UPDATE_USER, data);
      resolve(user);
    } catch(error){
      reject(error);
    }
  })
}

const profileApi = {
  updateUser
};
export default profileApi;
