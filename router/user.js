const express = require('express');

const router = express.Router();

router.get('/login', (req, res, next) => {
  res.status(200).send('<h1>Successfully Logged in<h1/>');
});

module.exports = router;
