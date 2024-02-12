const express = require('express');
const router = express.Router();
const weatherService = require('../services/weatherService');

router.post('/', weatherService.getWeather);

module.exports = router;