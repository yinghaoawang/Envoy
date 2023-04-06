import { call, put, takeLatest } from 'redux-saga/effects';
import { AuthLoginActionTypes } from './types';
import {
  authLoginApiResponseError,
  authLoginApiResponseSuccess
} from './actions';
import firebaseHelper from '../../../helpers/firebase';

function* loginUser({ payload: { user } }) {
  try {
    const response = yield call(
      firebaseHelper.loginUser,
      user.email,
      user.password
    );
    yield put(
      authLoginApiResponseSuccess(
        AuthLoginActionTypes.LOGIN_USER,
        response
      )
    );
  } catch (error) {
    yield put(
      authLoginApiResponseError(
        AuthLoginActionTypes.LOGIN_USER,
        error
      )
    );
  }
}

function* loginSaga() {
  yield takeLatest(AuthLoginActionTypes.LOGIN_USER, loginUser);
}

export default loginSaga;
