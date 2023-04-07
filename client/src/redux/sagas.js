import { all, } from 'redux-saga/effects';
import loginSaga from './auth/login/sagas';
import registerSaga from './auth/register/sagas';

export default function* rootSaga() {
  yield all([loginSaga(), registerSaga()]);
}
