const axios = require("axios");

const openWeatherApiKey = "06d7e954b208525a047d97b8407d4d5a";

exports.getWeather = async (coordinates) => {
  const openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates[1]}&lon=${coordinates[0]}&appid=${openWeatherApiKey}&units=metric`;
  const openWeatherResponse = await axios.get(openWeatherUrl);
  return openWeatherResponse.data;
};
