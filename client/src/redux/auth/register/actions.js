import { AuthRegisterActionTypes } from './types';

export const authRegisterApiResponseSuccess = (actionType, data) => ({
  type: AuthRegisterActionTypes.API_RESPONSE_SUCCESS,
  payload: { actionType, data }
});

export const authRegisterApiResponseError = (actionType, error) => ({
  type: AuthRegisterActionTypes.API_RESPONSE_ERROR,
  payload: { actionType, error }
});

export const registerUser = (user) => ({
  type: AuthRegisterActionTypes.REGISTER_USER,
  payload: { user }
});

export const resetRegisterState = () => ({
  type: AuthRegisterActionTypes.RESET_STATE
});
