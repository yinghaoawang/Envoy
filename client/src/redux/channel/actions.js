import { ChannelActionTypes } from './types';

export const channelSuccess = () => ({
  type: ChannelActionTypes.RES_SUCCESS
});

export const channelError = (error) => ({
  type: ChannelActionTypes.RES_ERROR,
  payload: { error }
});

export const createChannel = (data) => ({
  type: ChannelActionTypes.CREATE_CHANNEL,
  payload: { data }
});

export const resetChannelState = () => ({
  type: ChannelActionTypes.RESET_STATE
});
