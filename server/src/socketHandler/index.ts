import type { AppSocket, Message } from '../types';
const { connectUser, disconnectUser, onlineUsers } = require('../cache');

module.exports = (io: any) => {
  io.on('connect', (socket: AppSocket) => {
    connectUser(socket, socket.handshake.session?.passport?.user);
    console.log(onlineUsers, 'connect');

    socket.on('message', (payload: Message) => {
      const user = socket.handshake.session?.passport?.user;
      if (!user) {
        console.error('No session user in handle socket message');
        return;
      }
      console.log(user, payload.channel.id);
      connectUser(socket, user);
    });

    socket.on('disconnect', () => {
      disconnectUser(socket);
      console.log(onlineUsers, 'disconnect');
    });
  });
};
