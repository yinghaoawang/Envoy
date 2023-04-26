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

function uploadProfileImage(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await api.post(url.UPLOAD_PROFILE_IMAGE, data);
      resolve(user);
    } catch(error){
      reject(error);
    }
  })
}

const profileApi = {
  updateUser, uploadProfileImage
};
export default profileApi;
