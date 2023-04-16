export {};
const express = require('express');
const router = express.Router();
const { prisma } = require('../helpers/prismaHelper');
const { passport } = require('../helpers/passportHelper');
const { filterKeys, generateSalt, encrypt } = require('../helpers');
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

router.get('/me', isAuthenticated, async (req: any, res: any) => {
  const user = await prisma.user.findFirst({
    where: {
      id: req.user.id
    }
  });
  res.send(filterKeys(user, ['hashedPassword', 'salt']));
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
    passport.serializeUser(userData, (err: any, user: any) => {
      if (err) {
        return next(err);
      }
      req.session.passport = { user };
      res.send(user);
    });
  } catch (error) {
    return next(error);
  }
});

router.post('/logout', async (req: any, res: any, next: any) => {
  req.logout(function (err: any) {
    if (err) {
      return next(err);
    }
    res.send('success');
  });
});

module.exports = router;
