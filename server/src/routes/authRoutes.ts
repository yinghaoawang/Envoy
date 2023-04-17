export {};
const express = require('express');
const router = express.Router();
const { prisma } = require('../helpers/prismaHelper');
const { passport } = require('../helpers/passportHelper');
const { filterPasswordKeys, generateSalt, encrypt } = require('../helpers');
const { isAuthenticated } = require('../middlewares');
router.use(passport.initialize());
router.use(passport.session());

router.post(
  '/login',
  passport.authenticate('local'),
  (req: any, res: any, next: any) => {
    res.send(req.user);
  }
);

router.get('/me', isAuthenticated, async (req: any, res: any, next: any) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: req.user.id
      }
    });
    res.send(filterPasswordKeys(user));
  } catch (error) {
    return next(error);
  }
});

router.post('/register', async (req: any, res: any, next: any) => {
  try {
    const salt = generateSalt(16);
    const hashedPassword = encrypt(req.body.password, salt);
    const user = {
      displayName: req.body.displayName,
      email: req.body.email,
      hashedPassword,
      salt
    };
    const userData = await prisma.user.create({ data: user });
    passport.serializeUser(userData, (error: any, user: any) => {
      if (error) {
        return next(error);
      }
      req.session.passport = { user };
      res.send(user);
    });
  } catch (error) {
    return next(error);
  }
});

router.post('/logout', async (req: any, res: any, next: any) => {
  req.logout(function (error: any) {
    if (error) {
      return next(error);
    }
    res.send('success');
  });
});

module.exports = router;
