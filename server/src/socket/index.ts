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
    console.log('connected', socket.id, socket.handshake.session.passport.user.id)

    socket.on('channelMessage', socketHandlers.onChannelMessageHandler);
    socket.on('directMessage', socketHandlers.onDirectMessageHandler);
    socket.on('followUser', socketHandlers.onFollowUserHandler);
    socket.on('unfollowUser', socketHandlers.onUnfollowUserHandler);

    socket.on('disconnect', () => {
      console.log('disconnected', socket.id, socket.handshake.session.passport.user.id)
      disconnectUser(socket);
    });
  });
};
