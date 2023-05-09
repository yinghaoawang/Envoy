import { call, fork, take, takeLatest, select, put } from 'redux-saga/effects';
import { closeSocket, createSocket } from '../../helpers/socketHelper';
import { eventChannel } from 'redux-saga';
import { SocketActionTypes } from './types';
import { setChannels, setCurrentChannel } from '../channel/actions';
import { setChats, setCurrentChat } from '../directMessages/actions';

function* onChannelMessageHandler({ channel, message }) {
  const { channels, currentChannel } = yield select((state) => ({
    channels: state.Channel.channels,
    currentChannel: state.Channel.currentChannel
  }));

  const matchingChannel = channels.find((c) => c.id === channel.id);

  if (!matchingChannel) return;

  if (currentChannel === matchingChannel) {
    currentChannel.messages.push(message);
    yield put(setCurrentChannel(currentChannel));
  } else {
    matchingChannel.messages.push(message);
  }

  yield put(setChannels([...channels]));
}

function* onDirectMessageHandler({ message }) {
  const { chats, currentChat, userProfile } = yield select((state) => ({
    chats: state.DirectMessage.chats,
    currentChat: state.DirectMessage.currentChat,
    userProfile: state.Profile.user
  }));

  if (chats == null) return;

  const otherUser = currentChat.users.find(u => u.user.id !== userProfile.id)?.user;

  if (
    otherUser.id === message.toUserId ||
    otherUser.id === message.fromUserId
  ) {
    currentChat.messages.push(message);
    yield put(setCurrentChat(currentChat));
  }

  yield put(setChats([...chats]));
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
