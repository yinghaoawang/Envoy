import { call, put, takeLatest } from 'redux-saga/effects';
import { AuthActionTypes } from './types';
import { authSuccess, authError, resetAuthState } from './actions';
import authApi from '../../api/authApi';
import { resetProfileState, setUser } from '../profile/actions';
import { resetLayoutState } from '../layout/actions';
import { resetChannelState } from '../channel/actions';
import { closeCurrentSocket, openNewSocket } from '../socket/actions';

function* loginUser({ payload: { user } }) {
  try {
    const userData = yield call(authApi.loginUser, user.email, user.password);

    yield put(setUser(userData));
    yield put(openNewSocket());
    yield put(authSuccess());
  } catch (error) {
    yield put(authError(error));
  }
}

function* logoutUser() {
  try {
    yield call(authApi.logoutUser);
    yield put(resetAuthState());
    yield put(resetProfileState());
    yield put(resetLayoutState());
    yield put(resetChannelState());
    yield put(closeCurrentSocket());
    yield put(authSuccess());
  } catch (error) {
    yield put(authError(error));
  }
}

function* registerUser({ payload: { user } }) {
  try {
    const userData = yield call(
      authApi.registerUser,
      user.email,
      user.password,
      { displayName: user.displayName }
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
