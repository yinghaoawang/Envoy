export {};
const { prisma } = require('../helpers/prismaHelper.ts');
const router = require('express').Router();
router.post('/login', async (req: any, res: any) => {
  const users = await prisma.user.findMany()
  res.json({users});
});
router.post('/register', async (req: any, res: any) => {
  const users = await prisma.user.findMany()
  res.json({users});
})
module.exports = router;
