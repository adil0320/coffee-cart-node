const express = require('express');
const auth = require('../middleware/auth');
const userController = require('../controllers/user');

const router = express.Router();

router.post('/', userController.createUser);

router.post('/login', userController.login);

router.post('/logout', auth, userController.logout);

module.exports = router;
