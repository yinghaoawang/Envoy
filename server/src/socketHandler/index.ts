import type { AppSocket, Message, Channel, User, SocketUser } from '../types';
const {
  connectUser,
  disconnectUser,
  onlineUsers,
  channels
} = require('../cache');

const { filterPasswordKeys } = require('../helpers');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = (io: any) => {
  io.on('connect', (socket: AppSocket) => {
    connectUser(socket, socket.handshake.session?.passport?.user);

    socket.on('message', async (payload: Message) => {
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
          const updatedChannel = await prisma.channel.update({
            where: {
              id: channel.id
            },
            data: {
              messages: {
                create: [
                  {
                    content: payload.message,
                    user: { connect: { id: user.id } }
                  }
                ]
              }
            },
            include: {
              messages: {
                include: {
                  user: true
                }
              }
            }
          });
          const formattedMessage = filterPasswordKeys(updatedChannel.messages.at(-1));
          io.to(matchingSocketUser.socketId).emit('message', {
            channel: payload.channel,
            message: formattedMessage
          });
        }
      }
    });

    socket.on('disconnect', () => {
      disconnectUser(socket);
    });
  });
};
