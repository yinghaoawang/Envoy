module.exports = (app: any) => {
  app.get('/', async (req: any, res: any) => {
    res.json({message: 'hello'})
  });

  app.use('/users', require('./userRoutes'));
  app.use('/channels', require('./channelroutes'));
}
