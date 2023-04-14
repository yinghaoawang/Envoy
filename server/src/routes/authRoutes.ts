export {};
const { prisma } = require('../helpers/prismaHelper.ts');
const { passwordStrategy } = require('../helpers/passportHelper');
const passport = require('passport');
const express = require('express');
const router = express.Router();
const crypto = require('crypto');

passport.use(passwordStrategy);
router.use(passport.initialize());
// router.use(passport.session());

router.post('/login', (req: any, res: any, next: any) => {
  console.log(req.body);
  passport.authenticate('local', (err: any, user: any, info: any) => {
    console.log(err, user, info);
    if (err) {
      return next(err);
    }
    if (!user) {
      res.status(401);
      res.end(info.message);
      return;
    }
    res.send('success');
  })(req, res, next);
});

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
    await prisma.user.create({ data: user });
    console.log('success');
    res.send('success');
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
