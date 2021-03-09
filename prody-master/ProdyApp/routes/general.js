const express = require('express');
const router = express.Router();

const landinPpageController = require('../controllers/landingpage');
const consoleController = require('../controllers/console');

// router.get('/', landinPpageController.getLandingPage);
// router.post('/console/contact/submit', landinPpageController.postLandingPage);
router.get('*', consoleController.getConsoleLoginPage);
router.get('/login', consoleController.getConsoleLoginPage);

module.exports = router;