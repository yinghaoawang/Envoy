import { AuthRegisterActionTypes } from './types';

const INIT_STATE = {
  error: '',
  loading: false,
  user: null,
  isUserRegistereded: false
}

const Register = (state = INIT_STATE, action) => {
  switch (action.type) {
    case AuthRegisterActionTypes.API_RESPONSE_SUCCESS:
      switch (action.payload.actionType) {
        case AuthRegisterActionTypes.REGISTER_USER:
          return {
            ...state,
            loading: false,
            user: action.payload.data,
            error: null,
            isUserRegistereded: true
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
            isUserRegistereded: false
          }
        default:
          return { ...state };
      }
    case AuthRegisterActionTypes.REGISTER_USER:
      return {
        ...state,
        loading: true,
        isUserRegistereded: false
      }

    default:
      return { ...state };
  }
}

export default Register;