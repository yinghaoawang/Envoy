import { put, call, takeLatest } from 'redux-saga/effects';
import {
  authRegisterApiResponseError,
  authRegisterApiResponseSuccess
} from './actions';
import { AuthRegisterActionTypes } from './types';
import firebaseHelper from '../../../helpers/firebase';

function* registerUser({ payload: { user } }) {
  try {
    const response = yield call(firebaseHelper.registerUser, user.email, user.password);
    console.log(response);
    yield put(
      authRegisterApiResponseSuccess(
        AuthRegisterActionTypes.REGISTER_USER,
        response
      )
    );
  } catch (error) {
    yield put(
      authRegisterApiResponseError(
        AuthRegisterActionTypes.REGISTER_USER,
        error
      )
    );
  }
}

function* registerSaga() {
  yield takeLatest(AuthRegisterActionTypes.REGISTER_USER, registerUser);
}

export default registerSaga;
