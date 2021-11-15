const express = require('express');
const viewController = require('../controllers/viewController');

const router = express.Router();

router.get('/', viewController.getMain);
router.get('/about', viewController.getAbout);
router.get('/help', viewController.getHelp);
router.get('/weather', viewController.getWeather);

module.exports = router;
