const mongoose = require('mongoose');

const weatherEntrySchema = new mongoose.Schema({
	city: String,
	data: Object
});

const WeatherEntry = mongoose.model('WeatherEntry', weatherEntrySchema);

module.exports = WeatherEntry;