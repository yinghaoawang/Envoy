module.exports = (app: any) => {
  const isAuthenticated = (req: any, res: any, next: any) => {
    if (req.session.user) return next();
    return next('route');
  };
  app.get('/', isAuthenticated, async (req: any, res: any) => {
    res.json({ message: 'hello' });
  });
  app.use(require('./helperRoutes'));
  app.use(require('./authRoutes'));
  app.use('/user', require('./userRoutes'));
  app.use('/channel', require('./channelroutes'));
};
