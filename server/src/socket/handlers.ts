import type {
  AppSocket,
  ChannelMessage,
  DirectMessage,
  Channel,
  User,
  SocketUser
} from '../types';
const { onlineUsers } = require('../cache');
const { filterPasswordKeys, filterKeys } = require('../helpers');
const { prisma } = require('../helpers/prismaHelper');

const getCurrentUser = (socket: AppSocket, assertExists: boolean = false) => {
  const user = socket.handshake.session?.passport?.user;
  if (assertExists && !user) {
    throw new Error('No session user in handle socket message');
  }
  return user;
};

const dbHelpers = {
  addFollow: async (follower: User, following: User) => {
    const matchingFollow = await prisma.follow.findFirst({
      where: {
        followerUserId: follower.id,
        followingUserId: following.id
      }
    });

    if (matchingFollow) {
      return {
        error: {
          code: 123,
          message: 'User is already following targeted user.'
        } 
      };
    }

    const follow = await prisma.follow.create({
      data: {
        followerUserId: follower.id,
        followingUserId: following.id
      }
    });

    return { follow };
  },
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
    } else {
      directMessageChat = await prisma.directMessageChat.update({
        where: {
          id: directMessageChat.id
        },
        data: {
          updatedAt: new Date()
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

    return { directMessage, directMessageChat };
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
  },
  getAllFollows: async () => {
    return await prisma.follow.findMany({});
  },
  getAllUsers: async () => {
    return await prisma.user.findMany({});
  },
  getAllChannels: async () => {
    return await prisma.channel.findMany({
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
    onFollowUserHandler: async (payload: User) => {
      const following = payload;
      const follower = getCurrentUser(socket, true);
      if (following === null) {
        throw new Error('No follower in payload in handle on follow user');
      }
      const matchingFollowingSocketUser = onlineUsers.filter(
        (u: SocketUser) => u.user?.id === follower.id
      );

      const { error, follow } = await dbHelpers.addFollow(follower, following);
      if (error) {
        console.error(error.message);
        socket.emit('followUser', { error });
      }
      console.log(follow);
    },
    onDirectMessageHandler: async (payload: DirectMessage) => {
      const allUsers = await dbHelpers.getAllUsers();
      const user = getCurrentUser(socket, true);
      const toUser = allUsers.find((u: User) => u.id === payload.to.userId);
      if (toUser === null) {
        throw new Error(
          'No matching to user found in handle socket direct message'
        );
      }

      const matchingSocketUsers = onlineUsers.filter(
        (u: SocketUser) => u.user?.id === toUser.id || u.user?.id === user.id
      );

      const { directMessage, directMessageChat } =
        await dbHelpers.addDirectMessageToChat(user, toUser, payload.message);
      const formattedMessage = filterKeys(filterPasswordKeys(directMessage), [
        'chat'
      ]);

      if (matchingSocketUsers.length > 0) {
        for (const matchingSocketUser of matchingSocketUsers) {
          io.to(matchingSocketUser.socketId).emit('directMessage', {
            message: formattedMessage,
            updatedChat: directMessageChat
          });
        }
      }
    },

    onChannelMessageHandler: async (payload: ChannelMessage) => {
      const user = getCurrentUser(socket, true);
      const allChannels = await dbHelpers.getAllChannels();
      const channel = allChannels.find(
        (c: Channel) => c.id === payload.channel.id
      );
      if (channel == null) {
        throw new Error(
          'No matching channel found in handle socket channel message'
        );
      }

      for (const channelUser of channel.users) {
        const { userId } = channelUser;
        const matchingSocketUsers = onlineUsers.filter(
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
