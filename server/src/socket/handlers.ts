import type {
  AppSocket,
  ChannelMessage,
  DirectMessage,
  Channel,
  User,
  SocketUser
} from '../types';
const cache = require('../cache');
const { filterPasswordKeys, filterKeys } = require('../helpers');
const { prisma } = require('../helpers/prismaHelper');

const getUser = (socket: AppSocket, assertExists: boolean = false) => {
  const user = socket.handshake.session?.passport?.user;
  if (assertExists && !user) {
    throw new Error('No session user in handle socket message');
  }
  return user;
};

const dbHelpers = {
  addDirectMessageToChat: async (from: User, to: User, message: string) => {
    const userIds = [from.id, to.id];

    let directMessageChat = await prisma.directMessageChat.findFirst({
      where: {
        users: {
          every: {
            userId: {
              in: userIds
            }
          }
        }
      },
      include: {
        users: {
          select: {
            user: true
          }
        },
        messages: true
      }
    });

    if (directMessageChat == null) {
      directMessageChat = await prisma.directMessageChat.create({
        data: {
          users: {
            create: [
              { user: { connect: { id: from.id } } },
              { user: { connect: { id: to.id } } }
            ]
          }
        },
        include: {
          users: {
            select: {
              user: true
            }
          },
          messages: true
        }
      });
    }

    const directMessage = await prisma.directMessage.create({
      data: {
        content: message,
        from: {
          connect: {
            id: from.id
          }
        },
        to: {
          connect: {
            id: to.id
          }
        },
        chat: {
          connect: {
            id: directMessageChat.id
          }
        }
      },
      include: {
        to: true,
        from: true,
        chat: {
          include: {
            messages: true,
            users: true
          }
        }
      }
    });

    return directMessage;
  },
  addChannelMessage: async (channel: Channel, message: string, user: User) => {
    return await prisma.channel.update({
      where: {
        id: channel.id
      },
      data: {
        messages: {
          create: [
            {
              content: message,
              user: { connect: { id: user.id } }
            }
          ]
        }
      },
      include: {
        owner: true,
        users: {
          include: {
            user: true
          }
        },
        messages: {
          include: {
            user: true
          }
        }
      }
    });
  }
};

module.exports = (io: any, socket: AppSocket) => {
  return {
    onDirectMessageHandler: async (payload: DirectMessage) => {
      const user = getUser(socket, true);
      const toUser = cache.users.find((u: User) => u.id === payload.to.userId);
      if (toUser === null) {
        throw new Error(
          'No matching to user found in handle socket direct message'
        );
      }

      const matchingSocketUsers = cache.onlineUsers.filter(
        (u: SocketUser) => u.user?.id === toUser.id || u.user?.id === user.id
      );

      const directMessage = await dbHelpers.addDirectMessageToChat(
        user,
        toUser,
        payload.message
      );
      const formattedMessage = filterKeys(filterPasswordKeys(directMessage), ['chat']);

      if (matchingSocketUsers.length > 0) {
        for (const matchingSocketUser of matchingSocketUsers) {
          io.to(matchingSocketUser.socketId).emit('directMessage', {
            message: formattedMessage
          });
        }
      }
    },

    onChannelMessageHandler: async (payload: ChannelMessage) => {
      const user = getUser(socket, true);
      const channel = cache.channels.find(
        (c: Channel) => c.id === payload.channel.id
      );
      if (channel == null) {
        throw new Error(
          'No matching channel found in handle socket channel message'
        );
      }

      for (const channelUser of channel.users) {
        const { userId } = channelUser;
        const matchingSocketUsers = cache.onlineUsers.filter(
          (u: SocketUser) => u.user?.id === userId
        );

        const updatedChannel = await dbHelpers.addChannelMessage(
          channel,
          payload.message,
          user
        );
        const formattedMessage = filterPasswordKeys(
          updatedChannel.messages.at(-1)
        );

        if (matchingSocketUsers.length > 0) {
          for (const matchingSocketUser of matchingSocketUsers) {
            io.to(matchingSocketUser.socketId).emit('channelMessage', {
              channel: payload.channel,
              message: formattedMessage
            });
          }
        }
      }
    }
  };
};
