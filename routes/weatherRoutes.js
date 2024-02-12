const express = require('express');
const router = express.Router();
const axios = require('axios');
const WeatherData = require('../models/weatherData');
const History = require('../models/history');

router.get('/weather', async (req, res) => {
	const { city } = req.query;
	const openWeatherApiKey = "83a5fcfa01a18807f7afe989aa5cb971";
	const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWeatherApiKey}&units=metric`;

	try {
		const response = await axios.get(apiUrl);
		const data = response.data;

		const weatherData = new WeatherData({
			city: data.name,
			country: data.sys.country,
			temperature: data.main.temp,
			description: data.weather[0].description,
			humidity: data.main.humidity,
			pressure: data.main.pressure,
			windSpeed: data.wind.speed,
			rainVolume: data.rain ? data.rain['3h'] : 0,
			coord: {
				lat: data.coord.lat,
				lon: data.coord.lon
			}
		});
		await weatherData.save();

		await saveHistory(req, `Get weather for ${city}`, 'Success');

		res.json(weatherData);
	} catch (error) {
		console.error('Error fetching weather data:', error);
		res.status(500).json({ error: 'Error fetching weather data' });

		await saveHistory(req, `Get weather for ${city}`, 'Error');
	}
});

async function saveHistory(req, request, outcome) {
	try {
		await History.create({
			user: req.user ? req.user.name : 'Guest',
			request,
			outcome,
			timestamp: Date.now()
		});
	} catch (error) {
		console.error('Error saving history:', error);
	}
}

module.exports = router;