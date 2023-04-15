export {};
const { prisma } = require('../helpers/prismaHelper');
const { filterKeys } = require('../helpers');
const { isAuthenticated } = require('../middlewares');

const router = require('express').Router();
router.get('/me', isAuthenticated, async (req: any, res: any) => {
  const user = await prisma.user.findFirst({
    where: {
      id: req.user.id
    }
  });
  res.send(filterKeys(user, ['hashedPassword', 'salt']));
});

module.exports = router;