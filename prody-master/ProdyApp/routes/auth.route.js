const express = require('express');
const router = express.Router();
const authController = require('../auth/auth.controller');

router.post('/api/console_login', authController.signin);

module.exports = router;