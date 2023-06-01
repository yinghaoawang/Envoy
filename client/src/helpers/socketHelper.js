import io from 'socket.io-client';
import config from '../config';

let socket = null;

export function createSocket() {
  return new Promise(async (resolve) => {
    if (socket != null) {
      await closeSocket();
    }

    socket = io(config.SOCKET_URL, {
      path: config.SOCKET_PATH,
      secure: process.env.NODE_ENV ? true : false,
      transports: ['websocket'],
      withCredentials: true
    });

    socket.on('connect', () => {
      resolve(socket);
      console.log('Socket connected ', socket.id);
    });
  });
}

export function closeSocket() {
  return new Promise((resolve) => {
    if (socket == null) return resolve();
    socket.disconnect();
    socket = null;
    resolve();
  });
}

export function socketEmitEvent(name, payload) {
  if (socket == null) {
    console.error('Socket not created before emitting event');
    return;
  }
  socket.emit(name, payload);
}
