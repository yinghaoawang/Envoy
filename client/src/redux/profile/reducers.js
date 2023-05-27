import { ProfileActionTypes } from './types';

const INIT_STATE = {
  user: null,
  loading: false,
  success: null,
  error: null
};

const Profile = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ProfileActionTypes.RES_SUCCESS:
      return {
        ...state,
        error: null,
        success: action.payload?.success,
        loading: false
      };

    case ProfileActionTypes.RES_ERROR:
      return {
        ...state,
        error: action.payload.error,
        loading: false
      };

    case ProfileActionTypes.SET_USER:
      return { ...state, user: action.payload.data };

    case ProfileActionTypes.UPDATE_USER:
      return {
        ...state,
        loading: true
      };

    case ProfileActionTypes.RESET_STATE:
      return {
        ...INIT_STATE
      };

    default:
      return { ...state };
  }
};

export default Profile;
