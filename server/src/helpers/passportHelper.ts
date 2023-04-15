export {};
const passport = require('passport');
const crypto = require('crypto');
const LocalStrategy = require('passport-local');
const { filterKeys } = require('./');
const { prisma } = require('./prismaHelper');

const passwordStrategy = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  async function (username: String, password: String, done: any) {
    try {
      const user = await prisma.user.findFirst({
        where: {
          email: {
            equals: username
          }
        }
      });
      if (!user) {
        return done(null, false, {
          message: 'Incorrect username or password.'
        });
      }

      const hashedPassword = crypto.pbkdf2Sync(
        password,
        user.salt,
        310000,
        32,
        'sha256'
      );
      if (!crypto.timingSafeEqual(user.hashedPassword, hashedPassword)) {
        return done(null, false, {
          message: 'Incorrect username or password.'
        });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
);

passport.use(passwordStrategy);
passport.serializeUser(async (user: any, done: any) => {
  process.nextTick(() => {
    done(null, filterKeys(user, ['hashedPassword', 'salt']));
  });
});

passport.deserializeUser(async (user: any, done: any) => {
  try {
    const userData = await prisma.user.findFirst({
      where: {
        id: {
          equals: user.id
        }
      }
    });
    done(null, userData);
  } catch (error) {
    done(error);
  }
});

module.exports = { passport };
