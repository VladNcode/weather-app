const express = require('express');
const viewController = require('../controllers/viewController');

const router = express.Router();

router.get('/', viewController.getWeather);
router.get('/about', viewController.getAbout);
router.get('/help', viewController.getHelp);

module.exports = router;
