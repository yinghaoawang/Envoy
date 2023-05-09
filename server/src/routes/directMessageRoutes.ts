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

module.exports = router;
