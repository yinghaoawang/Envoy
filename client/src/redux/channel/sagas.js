import { call, put, takeLatest } from 'redux-saga/effects';
import { ChannelActionTypes } from './types';
import channelApi from '../../api/channelApi';
import { channelSuccess, channelError, setChannels } from './actions';

function* createChannel({ payload: { data } }) {
  try {
    yield call(channelApi.createChannel, data);
    yield call(loadChannels);
    yield put(channelSuccess());
  } catch (error) {
    yield put(channelError(error));
  }
}

function* loadChannels() {
  const channels = yield call(channelApi.getChannels);
  yield put(setChannels(channels));
  yield put(channelSuccess());
}

function* channelSaga() {
  yield takeLatest(ChannelActionTypes.CREATE_CHANNEL, createChannel);
  yield takeLatest(ChannelActionTypes.LOAD_CHANNELS, loadChannels);
}

export default channelSaga;
