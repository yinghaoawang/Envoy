export {};
const { prisma } = require('../helpers/prismaHelper');

const { passport } = require('../helpers/passportHelper');
const express = require('express');
const router = express.Router();
const crypto = require('crypto');
router.use(passport.initialize());
router.use(passport.session());

router.post(
  '/login',
  passport.authenticate('local'),
  (req: any, res: any, next: any) => {
    res.send(req.user);
  }
);

router.post('/register', async (req: any, res: any, next: any) => {
  try {
    const salt = crypto.randomBytes(16);
    const hashedPassword = crypto.pbkdf2Sync(
      req.body.password,
      salt,
      310000,
      32,
      'sha256'
    );
    const user = { email: req.body.email, hashedPassword, salt };
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
