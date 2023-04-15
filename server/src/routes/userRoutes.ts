export {};
const { prisma } = require('../helpers/prismaHelper');
const { exclude } = require('../helpers/passportHelper');
const { isAuthenticated } = require('./routeMiddlewares');

const router = require('express').Router();
router.get('/me', isAuthenticated, async (req: any, res: any) => {
  const user = await prisma.user.findFirst({
    where: {
      id: req.user.id
    }
  });
  const filteredUser = exclude(user, ['hashedPassword', 'salt']);
  res.json(filteredUser);
});
module.exports = router;