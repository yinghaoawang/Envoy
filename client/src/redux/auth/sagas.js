import { call, put, takeLatest } from 'redux-saga/effects';
import { AuthActionTypes } from './types';
import { authSuccess, authError } from './actions';
import authHelper from '../../helpers/authHelper';
import { setUser } from '../profile/actions';

function* loginUser({ payload: { user } }) {
  try {
    const userData = yield call(
      authHelper.loginUser,
      user.email,
      user.password
    );

    yield put(setUser(userData));
    yield put(authSuccess());
  } catch (error) {
    yield put(authError(error));
  }
}

function* logoutUser() {
  try {
    yield call(authHelper.logoutUser);
    yield put(authSuccess());
  } catch (error) {
    yield put(authError(error));
  }
}

function* registerUser({ payload: { user } }) {
  try {
    const userData = yield call(
      authHelper.registerUser,
      user.email,
      user.password
    );
    yield put(setUser(userData));
    yield put(authSuccess());
  } catch (error) {
    yield put(authError(error));
  }
}

function* authSaga() {
  yield takeLatest(AuthActionTypes.REGISTER_USER, registerUser);
  yield takeLatest(AuthActionTypes.LOGIN_USER, loginUser);
  yield takeLatest(AuthActionTypes.LOGOUT_USER, logoutUser);
}
export default authSaga;
