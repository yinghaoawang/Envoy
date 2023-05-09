import { call, put, takeLatest } from 'redux-saga/effects';
import { DirectMessageActionTypes } from './types';
import { directMessageSuccess, setChats } from './actions';
import directMessageApi from '../../api/directMessageApi';

function* loadChats() {
  const directMessageChats = yield call(directMessageApi.getDirectMessageChats);
  yield put(setChats(directMessageChats));
  yield put(directMessageSuccess());
}

function* directMessageSaga() {
  yield takeLatest(DirectMessageActionTypes.LOAD_CHATS, loadChats);
}

export default directMessageSaga;
