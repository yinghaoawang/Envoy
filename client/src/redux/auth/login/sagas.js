import { takeEvery, call, put } from 'redux-saga/effects';
import { AuthLoginActionTypes } from './types';
import { authLoginApiResponseSuccess } from './actions';

function* loginUser({ payload }) {
  console.log(payload);
  const fn = (param1) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('resolve', param1);
        resolve();
      }, 5000);
    });
  }
  const response = yield call(fn, '4');
  yield put(
    authLoginApiResponseSuccess(AuthLoginActionTypes.LOGIN_USER, response)
  );
}

function* loginSaga() {
  yield takeEvery(AuthLoginActionTypes.LOGIN_USER, loginUser);
}

export default loginSaga;