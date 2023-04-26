import { ChannelActionTypes } from './types';

export const channelSuccess = () => ({
  type: ChannelActionTypes.RES_SUCCESS
});

export const channelError = (error) => ({
  type: ChannelActionTypes.RES_ERROR,
  payload: { error }
});

export const loadChannels = () => ({
  type: ChannelActionTypes.LOAD_CHANNELS
});

export const createChannel = (data) => ({
  type: ChannelActionTypes.CREATE_CHANNEL,
  payload: { data }
});

export const setChannels = (data) => ({
  type: ChannelActionTypes.SET_CHANNELS,
  payload: { data }
});

export const setCurrentChannel = (data) => ({
  type: ChannelActionTypes.SET_CURRENT_CHANNEL,
  payload: { data }
});

export const resetChannelState = () => ({
  type: ChannelActionTypes.RESET_STATE
});
