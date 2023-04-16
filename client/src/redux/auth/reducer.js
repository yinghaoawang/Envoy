import { AuthActionTypes } from './types';

const INIT_STATE = {
  error: null,
  loading: false
};

const Auth = (state = INIT_STATE, action) => {
  switch (action.type) {
    case AuthActionTypes.RES_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false
      };

    case AuthActionTypes.RES_ERROR:
      return {
        ...state,
        error: action.payload.error,
        loading: false
      };

    case AuthActionTypes.LOGIN_USER:
      return {
        ...state,
        loading: true
      };

    case AuthActionTypes.REGISTER_USER:
      return {
        ...state,
        loading: true
      };

    case AuthActionTypes.LOGOUT_USER:
      return {
        ...state,
        loading: false
      };

    case AuthActionTypes.RESET_STATE:
      return {
        ...INIT_STATE
      };

    default:
      return { ...state };
  }
};

export default Auth;
