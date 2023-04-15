import { put, takeLatest } from 'redux-saga/effects';
import { LayoutActionTypes } from './types';
import { switchContent } from './actions';

function* switchTab({ payload: { data } }) {
  try {
    if (data.content?.component) {
      yield put(switchContent(data.content));
    }
  } catch (error) {
    console.error(error);
  }
}

function* layoutSaga() {
  yield takeLatest(LayoutActionTypes.SWITCH_TAB, switchTab);
}

export default layoutSaga;
