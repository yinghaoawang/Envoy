import { AuthLoginActionTypes } from './types';

const INIT_STATE = {
  error: '',
  loading: false
};

const Login = (state = INIT_STATE, action) => {
  switch (action.type) {
    case AuthLoginActionTypes.API_RESPONSE_SUCCESS:
      switch (action.payload.actionType) {
        case AuthLoginActionTypes.LOGIN_USER:
          return {
            ...state,
            user: action.payload.data,
            loading: false,
            isUserLogin: true,
            isUserLogout: false,
          };
        case AuthLoginActionTypes.LOGOUT_USER:
          return {
            ...state,
            loading: false,
            isUserLogout: true,
          };
        default:
          return { ...state };
      }

    case AuthLoginActionTypes.API_RESPONSE_ERROR:
      switch (action.payload.actionType) {
        case AuthLoginActionTypes.LOGIN_USER:
          console.log('login');
          return {
            ...state,
            error: action.payload.error,
            isUserLogin: false,
            loading: false,
          };
        case AuthLoginActionTypes.LOGOUT_USER:
          return {
            ...state,
            loading: false,
            isUserLogin: false,
            isUserLogout: false,
          };
        default:
          return { ...state };
      }

    case AuthLoginActionTypes.LOGIN_USER: {
      return {
        ...state,
        loading: true,
        isUserLogin: false,
      };
    }

    case AuthLoginActionTypes.LOGOUT_USER:
      return {
        ...state,
        loading: false,
        isUserLogout: false,
      };
    default:
      return { ...state };
  }
}

export default Login;