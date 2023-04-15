module.exports = (app: any) => {
  const isAuthenticated = (req: any, res: any, next: any) => {
    if (req.session.user) next();
    else next('route');
  };
  app.get('/', isAuthenticated, async (req: any, res: any) => {
    res.json({ message: 'hello' });
  });
  app.use(require('./helperRoutes'));
  app.use(require('./authRoutes'));
  app.use('/users', require('./userRoutes'));
  app.use('/channels', require('./channelroutes'));
};
