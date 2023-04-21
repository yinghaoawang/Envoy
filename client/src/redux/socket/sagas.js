import { call, fork, take } from 'redux-saga/effects';
import { createSocket } from '../../helpers/socketHelper';
import { eventChannel } from 'redux-saga';

const socketEvents = [
  {
    name: 'ping',
    handler: (payload) => {
      console.log('Received server ping at ', payload.createdAt);
    }
  }
];

function createSocketChannel(socket) {
  return eventChannel((emit) => {
    const unsubscribeMap = {};
    for (const event of socketEvents) {
      const handleEvent = (payload) => {
        emit({
          payload,
          event
        });
      };
      socket.on(event.name, handleEvent);
      unsubscribeMap[event.name] = handleEvent;
    }

    const unsubscribe = () => {
      for (const key in unsubscribeMap) {
        socket.off(key, unsubscribeMap[key]);
      }
    };

    return unsubscribe;
  });
}

function* watchSocket(socket) {
  const channel = yield call(createSocketChannel, socket);
  while (true) {
    let { event, payload } = yield take(channel);
    yield call(event.handler, payload);
  }
}

function* socketSaga() {
  const socket = yield call(createSocket);
  yield fork(watchSocket, socket);
}

export default socketSaga;
