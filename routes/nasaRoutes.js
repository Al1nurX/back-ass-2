const express = require('express');
const axios = require('axios');
const router = express.Router();
const History = require('../models/history');

async function fetchNasaData() {
	try {
		const apiKey = "6KGdDTKd3rw4Ot61h0mlU6QKiw7Fswt7ag0zShEm";
		const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
		const response = await axios.get(apiUrl);
		return response.data;
	} catch (error) {
		throw error;
	}
}

router.get('/nasaData', async (req, res) => {
	try {
		const nasaData = await fetchNasaData();

		await saveHistory(req, 'Get NASA data', 'Success');

		res.render('nasaData', { nasaData });
	} catch (error) {
		console.error('Error fetching NASA data:', error);

		await saveHistory(req, 'Get NASA data', 'Error');

		res.status(500).send('Internal Server Error');
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