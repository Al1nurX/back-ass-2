const mongoose = require('mongoose');

const weatherDataSchema = new mongoose.Schema({
	city: String,
	country: String,
	temperature: Number,
	description: String,
	humidity: Number,
	pressure: Number,
	windSpeed: Number,
	rainVolume: Number
});

const WeatherData = mongoose.model('WeatherData', weatherDataSchema);

module.exports = WeatherData;