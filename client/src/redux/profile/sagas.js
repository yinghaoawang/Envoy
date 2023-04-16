import { call, put, takeLatest } from 'redux-saga/effects';
import { ProfileActionTypes } from './types';
import profileApi from '../../api/profileApi';
import { profileError, profileSuccess, setUser } from './actions';

function* updateUser({ payload: { data } }) {
  try {
    yield call(profileApi.updateUser, data);
    yield put(setUser(data));
    yield put(profileSuccess());
  } catch (error) {
    yield put(profileError(error));
  }
}

function* profileSaga() {
  yield takeLatest(ProfileActionTypes.UPDATE_USER, updateUser);
}

export default profileSaga;
