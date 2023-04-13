export {};
const router = require('express').Router();
router.get('/', async (req: any, res: any) => {
  res.json({message: 'channels'})
});
module.exports = router;