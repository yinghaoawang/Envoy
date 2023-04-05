import { all } from 'redux-saga/effects';

import loginSaga from './auth/login/sagas';
export default function* rootSaga() {
  yield all([
    loginSaga()
  ])
}
