import { api } from './apiCore';
import * as url from './urls';

function getChannels() {
  return new Promise(async (resolve, reject) => {
    try {
      const channels = await api.get(url.GET_CHANNELS);
      resolve(channels);
    } catch (error) {
      reject(error);
    }
  });
}

function getDiscoverChannels() {
  return new Promise(async (resolve, reject) => {
    try {
      const channels = await api.get(url.GET_DISCOVER_CHANNELS);
      resolve(channels);
    } catch (error) {
      reject(error);
    }
  });
}

function createChannel(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const channel = await api.post(url.CREATE_CHANNEL, data);
      resolve(channel);
    } catch (error) {
      reject(error);
    }
  });
}


const channelApi = {
  getChannels, getDiscoverChannels, createChannel
};
export default channelApi;
