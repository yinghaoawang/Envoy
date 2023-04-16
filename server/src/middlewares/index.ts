const isAuthenticated = (req: any, res: any, next: any) => {
  if (req.user) return next();
  res.status(401).send('User is not authenticated');
};

const isNotAuthenticated = (req: any, res: any, next: any) => {
  if (!req.user) return next();
  res.status(401).send('User is authenticated');
};

module.exports = { isAuthenticated, isNotAuthenticated };