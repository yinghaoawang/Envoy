const express = require('express');
const router = express.Router();
router.get('/session', (req: any, res: any) => {
  res.send(req.session);
});

module.exports = router;