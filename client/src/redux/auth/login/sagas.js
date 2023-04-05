import { takeEvery, call, put } from 'redux-saga/effects';
import { AuthLoginActionTypes } from './types';
import {
  authLoginApiResponseError,
  authLoginApiResponseSuccess
} from './actions';
import firebaseHelper from '../../../helpers/firebase';

function* loginUser({ payload }) {
  try {
    const response = yield call(
      firebaseHelper.loginUser,
      payload.email,
      payload.password
    );
    yield put(
      authLoginApiResponseSuccess(AuthLoginActionTypes.LOGIN_USER, response)
    );
  } catch (error) {
    yield put(
      authLoginApiResponseError(AuthLoginActionTypes.LOGIN_USER, error)
    );
  }
}

function* loginSaga() {
  yield takeEvery(AuthLoginActionTypes.LOGIN_USER, loginUser);
}

export default loginSaga;
