import { AuthRegisterActionTypes } from './types';

const INIT_STATE = {
  error: '',
  loading: false,
  isUserRegistered: false
};

const Register = (state = INIT_STATE, action) => {
  switch (action.type) {
    case AuthRegisterActionTypes.API_RESPONSE_SUCCESS:
      switch (action.payload.actionType) {
        case AuthRegisterActionTypes.REGISTER_USER:
          return {
            ...state,
            loading: false,
            error: null,
            isUserRegistered: true
          };
        default:
          return { ...state };
      }
    case AuthRegisterActionTypes.API_RESPONSE_ERROR:
      switch (action.payload.actionType) {
        case AuthRegisterActionTypes.REGISTER_USER:
          return {
            ...state,
            loading: false,
            error: action.payload.error,
            isUserRegistered: false
          };
        default:
          return { ...state };
      }
    case AuthRegisterActionTypes.REGISTER_USER:
      return {
        ...state,
        loading: true,
        isUserRegistered: false
      };

    case AuthRegisterActionTypes.RESET_STATE:
      return {
        ...INIT_STATE
      };

    default:
      return { ...state };
  }
};

export default Register;
