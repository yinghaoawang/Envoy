import { api } from './apiCore';
import * as url from './urls';

function getChannels() {
  return new Promise(async (resolve, reject) => {
    try {
      const channels = await api.get(url.GET_CHANNELS);
      resolve(channels);
    } catch(error){
      reject(error);
    }
  })
}

const channelsApi = {
  getChannels
};
export default channelsApi;
