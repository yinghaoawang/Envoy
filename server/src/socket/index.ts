import type { AppSocket } from '../types';
const { connectUser, disconnectUser } = require('../cache');

module.exports = (io: any) => {
  io.on('connect', (socket: AppSocket) => {
    const socketHandlers = require('./handlers')(io, socket);
    if (socket.handshake.session?.passport?.user == null) {
      console.error('Socket does not have a session user.');
      return;
    }

    connectUser(socket, socket.handshake.session.passport.user);

    socket.on('message', socketHandlers.onMessageHandler);

    socket.on('disconnect', () => {
      disconnectUser(socket);
    });
  });
};
