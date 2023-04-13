module.exports = (app: any) => {
  app.get('/', async (req: any, res: any) => {
    res.json({message: 'hello'})
  });
  app.use(require('./authRoutes'));
  app.use('/users', require('./userRoutes'));
  app.use('/channels', require('./channelroutes'));
}
