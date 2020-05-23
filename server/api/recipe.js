const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  if (req.user) {
    return res.json({message: 'Token is valid', success: true }).send()
  } else {
    return res.json({message: 'Token missing or invalid', success: false }).send()
  }
});

module.exports = router;
