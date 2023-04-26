import { call, put, takeLatest } from 'redux-saga/effects';
import { DirectMessageActionTypes } from './types';
import { directMessageSuccess, setDirectMessages } from './actions';
import directMessageApi from '../../api/directMessageApi';

function* loadDirectMessages() {
  const directMessages = yield call(directMessageApi.getDirectMessages);
  yield put(setDirectMessages(directMessages));
  yield put(directMessageSuccess());
}

function* directMessageSaga() {
  yield takeLatest(DirectMessageActionTypes.LOAD_DIRECT_MESSAGES, loadDirectMessages);
}

export default directMessageSaga;
