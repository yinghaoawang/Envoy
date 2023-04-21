import io from 'socket.io-client';
import config from '../config';

export function createSocket() {
  const socket = io(config.SOCKET_URL, { transports: ['websocket'] });
  return new Promise((resolve) => {
    socket.on('connect', () => {
      resolve(socket);
      console.log('Socket connected ', socket.id);
    });
  });
}
