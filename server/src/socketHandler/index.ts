import type { AppSocket, Message, Channel, User, SocketUser } from '../types';
const {
  connectUser,
  disconnectUser,
  onlineUsers,
  channels
} = require('../cache');

module.exports = (io: any) => {
  io.on('connect', (socket: AppSocket) => {
    connectUser(socket, socket.handshake.session?.passport?.user);
    console.log(onlineUsers, 'connect');

    socket.on('message', (payload: Message) => {
      const user = socket.handshake.session?.passport?.user;
      if (!user) {
        throw new Error('No session user in handle socket message');
      }
      const channel = channels.find(
        (c: Channel) => c.id === payload.channel.id
      );
      if (channel == null) {
        throw new Error('No matching channel found in handle socket message');
      }
      for (const channelUser of channel.users) {
        const { userId } = channelUser;
        const matchingSocketUser = onlineUsers.find(
          (u: SocketUser) => u.user?.id === userId
        );
        if (matchingSocketUser) {
          io.to(matchingSocketUser.socketId).emit('message', payload);
        }
      }
    });

    socket.on('disconnect', () => {
      disconnectUser(socket);
    });
  });
};
