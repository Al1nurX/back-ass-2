const axios = require('axios');

const timezoneDbApiKey = "VLGQE2X3A9FD";

exports.getTimezone = async (coordinates) => {
	try {
		const [lng, lat] = coordinates;
		const timezoneDbUrl = `http://api.timezonedb.com/v2.1/get-time-zone?key=${timezoneDbApiKey}&format=json&by=position&lat=${lat}&lng=${lng}`;

		const response = await axios.get(timezoneDbUrl);
		return response.data;
	} catch (error) {
		throw error;
	}
};
