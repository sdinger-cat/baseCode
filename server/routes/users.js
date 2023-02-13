const express = require('express');
const router = express.Router();

//basePath : http://localhost:3001/v1/users

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
