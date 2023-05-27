export {};
const { isAuthenticated } = require('../middlewares');

module.exports = (app: any) => {
  app.get('/', isAuthenticated, async (req: any, res: any) => {
    res.json({ message: 'hello' });
  });
  app.use(require('./helperRoutes'));
  app.use(require('./authRoutes'));
  app.use('/user', require('./userRoutes'));
  app.use('/channel', require('./channelRoutes'));
  app.use('/direct-message', require('./directMessageRoutes'));
  app.use('/follow', require('./followRoutes'));
};
