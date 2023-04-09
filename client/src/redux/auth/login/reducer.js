import { AuthLoginActionTypes } from './types';
import firebaseHelper from '../../../helpers/firebase';

const INIT_STATE = {
  error: '',
  loading: false,
  isUserLoggedIn: false,
  isUserLoggedOut: false
};

const Login = (state = INIT_STATE, action) => {
  switch (action.type) {
    case AuthLoginActionTypes.API_RESPONSE_SUCCESS:
      switch (action.payload.actionType) {
        case AuthLoginActionTypes.LOGIN_USER:
          firebaseHelper.setLoggedInUser(action.payload.data);
          return {
            ...state,
            user: action.payload.data,
            loading: false,
            isUserLoggedIn: true,
          };
        case AuthLoginActionTypes.LOGOUT_USER:
          firebaseHelper.setLoggedInUser(null);
          return {
            ...state,
            loading: false,
            isUserLoggedOut: true,
            isUserLoggedIn: false,
          };
        default:
          return { ...state };
      }

    case AuthLoginActionTypes.API_RESPONSE_ERROR:
      switch (action.payload.actionType) {
        case AuthLoginActionTypes.LOGIN_USER:
          return {
            ...state,
            error: action.payload.error,
            loading: false,
            isUserLoggedIn: false,
          };
        case AuthLoginActionTypes.LOGOUT_USER:
          return {
            ...state,
            loading: false,
            isUserLoggedOut: false,
          };
        default:
          return { ...state };
      }

    case AuthLoginActionTypes.LOGIN_USER: {
      return {
        ...state,
        loading: true,
        isUserLoggedIn: false,
      };
    }

    case AuthLoginActionTypes.LOGOUT_USER:
      return {
        ...state,
        loading: false,
        isUserLoggedOut: false,
      };

    case AuthLoginActionTypes.RESET_STATE:
      return {
        ...INIT_STATE
      };

    default:
      return { ...state };
  }
}

export default Login;