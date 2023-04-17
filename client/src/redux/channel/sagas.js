import { call, put, takeLatest } from 'redux-saga/effects';
import { ChannelActionTypes } from './types';
import channelApi from '../../api/channelApi';
import { channelSuccess, channelError } from './actions';

function* createChannel({ payload: { data } }) {
  try {
    console.log('creation');
    yield call(channelApi.createChannel, data);
    console.log('b');
    yield put(channelSuccess());
    console.log('a');
  } catch (error) {
    yield put(channelError(error));
  }
}

function* channelSaga() {
  yield takeLatest(ChannelActionTypes.CREATE_CHANNEL, createChannel);
}

export default channelSaga;
