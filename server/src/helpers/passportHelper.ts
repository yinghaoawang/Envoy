export {};
const passport = require('passport');
const crypto = require('crypto');
const LocalStrategy = require('passport-local');
const { prisma } = require('./prismaHelper');

function exclude<User, Key extends keyof User>(
  user: User,
  keys: Key[]
): Omit<User, Key> {
  for (let key of keys) {
    delete user[key];
  }
  return user;
}

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
    done(null, exclude(user, ['hashedPassword', 'salt']));
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

module.exports = { passport, exclude };
