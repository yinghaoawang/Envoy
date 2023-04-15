import { ProfileActionTypes } from './types';

const INIT_STATE = {
  user: null
};

const Profile = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ProfileActionTypes.SET_USER: {
      return { ...state, user: action.payload.user };
    }
    case ProfileActionTypes.RESET_STATE: {
      return {
        ...INIT_STATE
      }
    }
    default:
      return { ...state };
  }
};

export default Profile;
