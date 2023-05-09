import { DirectMessageActionTypes } from './types';

const INIT_STATE = {
  chats: [],
  currentChat: null,
  loading: false,
  error: null
};

const DirectMessage = (state = INIT_STATE, action) => {
  switch (action.type) {
    case DirectMessageActionTypes.RES_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false
      };

    case DirectMessageActionTypes.RES_ERROR:
      return {
        ...state,
        error: action.payload.error,
        loading: false
      };

    case DirectMessageActionTypes.SET_CURRENT_CHAT:
      return {
        ...state,
        currentChat: action.payload.data
      };

      case DirectMessageActionTypes.SET_CHATS:
      return {
        ...state,
        chats: action.payload.data
      };

    case DirectMessageActionTypes.LOAD_CHATS:
      return {
        ...state,
        loading: true
      };

    case DirectMessageActionTypes.RESET_STATE:
      return {
        ...INIT_STATE
      };

    default:
      return { ...state };
  }
};

export default DirectMessage;
