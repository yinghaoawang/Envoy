export {};
const { prisma } = require('../helpers/prismaHelper');
const { isAuthenticated } = require('../middlewares');
const { filterPasswordKeys } = require('../helpers');
const router = require('express').Router();

router.get('/', isAuthenticated, async (req: any, res: any, next: any) => {
  try {
    const directMessageChats = await prisma.directMessageChat.findMany({
      where: {
        users: {
          some: {
            userId: req.user.id
          }
        }
      },
      orderBy: [
        {
          updatedAt: 'desc'
        }
      ],
      include: {
        messages: {
          include: {
            from: true
          }
        },
        users: {
          include: {
            user: true
          }
        }
      }
    });
    res.send(filterPasswordKeys(directMessageChats));
  } catch (error) {
    return next(error);
  }
});

router.post(
  '/create',
  isAuthenticated,
  async (req: any, res: any, next: any) => {
    try {
      const { toUser } = req.body;
      const fromUser = req.user;
      const userIds = [toUser.id, fromUser.id];

      const existingChatData = await prisma.directMessageChat.findFirst({
        where: {
          users: {
            every: {
              userId: {
                in: userIds
              }
            }
          }
        }
      });

      let resData = null;

      if (existingChatData) {
        resData = await prisma.directMessageChat.update({
          where: {
            id: existingChatData.id
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
      } else {
        resData = await prisma.directMessageChat.create({
          data: {
            users: {
              create: [
                { user: { connect: { id: toUser.id } } },
                { user: { connect: { id: fromUser.id } } }
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

      res.send(filterPasswordKeys(resData));
    } catch (error) {
      return next(error);
    }
  }
);

module.exports = router;
