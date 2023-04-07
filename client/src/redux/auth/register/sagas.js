import { put, call, takeLatest } from 'redux-saga/effects';
import {
  authRegisterApiResponseError,
  authRegisterApiResponseSuccess
} from './actions';
import { AuthRegisterActionTypes } from './types';
import firebaseHelper from '../../../helpers/firebase';

function* registerUser({ payload: { user } }) {
  try {
    const userCredential = yield call(
      firebaseHelper.registerUser,
      user.email,
      user.password
    );
    yield put(
      authRegisterApiResponseSuccess(
        AuthRegisterActionTypes.REGISTER_USER,
        userCredential
      )
    );
  } catch (error) {
    yield put(
      authRegisterApiResponseError(AuthRegisterActionTypes.REGISTER_USER, error)
    );
  }
}

function* registerSaga() {
  yield takeLatest(AuthRegisterActionTypes.REGISTER_USER, registerUser);
}

export default registerSaga;
