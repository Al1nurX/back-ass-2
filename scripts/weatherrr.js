const mapboxService = require("../services/mapboxService");
const openWeatherService = require("../services/openWeatherService");
const timezoneService = require('../services/timezoneService');
const searchHistoryController = require('./searchHistoryController.js');

exports.getWeather = async (req, res) => {
  try {
    const { city } = req.body;
    const coordinates = await mapboxService.getCoordinates(city);
    const weatherData = await openWeatherService.getWeather(coordinates);
    const weatherIconCode = weatherData.weather[0].icon;
    const weatherIconUrl = `http://openweathermap.org/img/wn/${weatherIconCode}.png`;
    const timezoneData = await timezoneService.getTimezone(coordinates);

    await searchHistoryController.saveSearch(city, coordinates, weatherData);

    res.json({
      coordinates,
      weatherData,
      weatherIconUrl,
      timezoneData,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
