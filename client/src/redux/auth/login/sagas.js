import { call, put, takeLatest } from 'redux-saga/effects';
import { AuthLoginActionTypes } from './types';
import {
  authLoginApiResponseError,
  authLoginApiResponseSuccess,
} from './actions';
import authHelper from '../../../helpers/authHelper';

function* loginUser({ payload: { user } }) {
  try {
    const userData = yield call(
      authHelper.loginUser,
      user.email,
      user.password
    );
    
    yield put(
      authLoginApiResponseSuccess(
        AuthLoginActionTypes.LOGIN_USER,
        userData
      )
    );
  } catch (error) {
    yield put(
      authLoginApiResponseError(AuthLoginActionTypes.LOGIN_USER, error)
    );
  }
}

function* logoutUser() {
  try {
    yield call(authHelper.logoutUser);
    yield put(authLoginApiResponseSuccess(AuthLoginActionTypes.LOGOUT_USER));
  } catch (error) {
    yield put(
      authLoginApiResponseError(AuthLoginActionTypes.LOGOUT_USER, error)
    );
  }
}

// function getAuthChannel() {
//   return eventChannel((emit) => {
//     const auth = getAuth();
//     const unsubscribe = onAuthStateChanged(auth, (user) =>
//       emit(user || 'null')
//     );
//     return unsubscribe;
//   });
// }

// function* authWatch() {
//   const channel = yield call(getAuthChannel);
//   while (true) {
//     const user = yield take(channel);
//     // TODO set user profile redux
//     if (user !== 'null') {
//       yield put(
//         call(firebaseHelper.setLoggedInUser, user)
//       );
//     } else {
//       yield call(firebaseHelper.setLoggedInUser, null);
//     }
//   }
// }

function* loginSaga() {
  // yield fork(authWatch);
  yield takeLatest(AuthLoginActionTypes.LOGIN_USER, loginUser);
  yield takeLatest(AuthLoginActionTypes.LOGOUT_USER, logoutUser);
}

export default loginSaga;
