export {};
const { prisma } = require('../helpers/prismaHelper');
const { isAuthenticated } = require('../middlewares');
const { filterKeys } = require('../helpers');
const router = require('express').Router();
router.get('/', isAuthenticated, async (req: any, res: any, next: any) => {
  try {
    const channels = await prisma.channel.findMany({
      where: {
        users: {
          some: {
            user: {
              id: req.user.id
            }
          }
        }
      },
      include: {
        owner: true,
        users: {
          include: {
            user: true
          }
        }
      }
    });
    res.send(filterKeys(channels, ['hashedPassword', 'salt']));
  } catch (error) {
    next(error);
  }
});
router.post(
  '/create',
  isAuthenticated,
  async (req: any, res: any, next: any) => {
    try {
      const channel = {
        name: req.body.name,
        owner: {
          connect: { id: req.user.id }
        },
        users: {
          create: [{ user: { connect: { id: req.user.id } } }]
        }
      };
      const channelData = await prisma.channel.create({ data: channel });
      res.send(channelData);
    } catch (error) {
      next(error);
    }
  }
);
module.exports = router;
