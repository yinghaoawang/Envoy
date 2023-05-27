export {};
const { prisma } = require('../helpers/prismaHelper');
const { isAuthenticated } = require('../middlewares');
const { filterPasswordKeys } = require('../helpers');
const router = require('express').Router();

router.get(
  '/user/:userId',
  isAuthenticated,
  async (req: any, res: any, next: any) => {
    try {
      const { userId } = req.params;

      const followers = await prisma.follow.findMany({
        where: {
          followingUserId: parseInt(userId)
        },
        orderBy: [
          {
            updatedAt: 'desc'
          }
        ],
        include: {
          follower: true
        }
      });

      const following = await prisma.follow.findMany({
        where: {
          followerUserId: parseInt(userId)
        },
        orderBy: [
          {
            updatedAt: 'desc'
          }
        ],
        include: {
          following: true
        }
      });

      const payload = {
        followers,
        following
      };

      res.send(filterPasswordKeys(payload));
    } catch (error) {
      return next(error);
    }
  }
);

module.exports = router;
