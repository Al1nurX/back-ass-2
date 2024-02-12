const axios = require("axios");

const mapboxApiKey = "pk.eyJ1IjoiaWxsdXMxdmUiLCJhIjoiY2xybHZ3aGtsMHU2YzJqb2M2ZmdoMm9zaSJ9.kP-WQ0DEvEtwryhKGshCtw";

exports.getCoordinates = async (city) => {
	const mapboxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=${mapboxApiKey}`;
	const mapboxResponse = await axios.get(mapboxUrl);
	return mapboxResponse.data.features[0].center;
};
