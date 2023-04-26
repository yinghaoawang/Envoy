export {};
const { prisma } = require('../helpers/prismaHelper');
const { isAuthenticated } = require('../middlewares');
const { filterPasswordKeys } = require('../helpers');
const router = require('express').Router();

router.get('/', isAuthenticated, async (req: any, res: any, next: any) => {
  try {
    const directMessages = await prisma.directMessage.findMany({
      where: {
        OR: [{ toUserId: req.user.id }, { fromUserId: req.user.id }]
      },
      include: {
        to: true,
        from: true
      }
    });
    res.send(filterPasswordKeys(directMessages));
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
