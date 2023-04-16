export {};
const { isAuthenticated } = require('../middlewares');
const { prisma } = require('../helpers/prismaHelper');
const { filterKeys, encrypt } = require('../helpers');
const router = require('express').Router();

router.post('/update', isAuthenticated, async (req: any, res: any) => {
  const updateData = {
    ...req.body
  }
  if (req.body.password) {
    updateData.hashedPassword = encrypt(updateData.password, req.user.salt);
    delete updateData.password;
  }
  const user = await prisma.user.update({
    where: {
      id: req.user.id
    },
    data: updateData
  });
  res.send(filterKeys(user, ['hashedPassword', 'salt']));
});

module.exports = router;