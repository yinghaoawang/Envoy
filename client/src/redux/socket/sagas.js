import { call, fork, take, takeLatest, select, put } from 'redux-saga/effects';
import { closeSocket, createSocket } from '../../helpers/socketHelper';
import { eventChannel } from 'redux-saga';
import { SocketActionTypes } from './types';
import { setChannels } from '../channel/actions';
import { setDirectMessages } from '../directMessages/actions';

function* onChannelMessageHandler({ channel, message }) {
  const { channels } = yield select((state) => ({
    channels: state.Channel.channels
  }));
  const matchingChannel = channels.find((c) => c.id === channel.id);
  if (!matchingChannel) return;

  matchingChannel.messages.push(message);
  yield put(setChannels([...channels]));
}

function* onDirectMessageHandler({ message }) {
  const { directMessages } = yield select((state) => ({
    directMessages: state.DirectMessage.directMessages
  }));

  if (directMessages == null) return;
  directMessages.push(message);

  yield put(setDirectMessages([...directMessages]));
}

function createSocketChannel(socket) {
  const socketEvents = [
    {
      name: 'channelMessage',
      handler: onChannelMessageHandler
    },
    {
      name: 'directMessage',
      handler: onDirectMessageHandler
    }
  ];

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

function* openNewSocket() {
  const socket = yield call(createSocket);
  yield fork(watchSocket, socket);
}

function* closeCurrentSocket() {
  yield call(closeSocket);
}

function* socketSaga() {
  yield takeLatest(SocketActionTypes.OPEN_NEW_SOCKET, openNewSocket);
  yield takeLatest(SocketActionTypes.CLOSE_CURRENT_SOCKET, closeCurrentSocket);
}

export default socketSaga;
