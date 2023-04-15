import { all, } from 'redux-saga/effects';
import authSaga from './auth/sagas';
import layoutSaga from './layout/sagas';
import profileSaga from './profile/sagas';

export default function* rootSaga() {
  yield all([authSaga(), layoutSaga(), profileSaga()]);
}
