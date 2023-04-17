import { ChannelActionTypes } from './types';

const INIT_STATE = {
  channel: null,
  loading: false,
  error: null
};

const Channel = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ChannelActionTypes.RES_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false
      };

    case ChannelActionTypes.RES_ERROR:
      return {
        ...state,
        error: action.payload.error,
        loading: false
      };

    case ChannelActionTypes.CREATE_CHANNEL:
      return { ...state, loading: true };

    case ChannelActionTypes.RESET_STATE:
      return {
        ...INIT_STATE
      };

    default:
      return { ...state };
  }
};

export default Channel;
