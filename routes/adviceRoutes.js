const express = require('express');
const axios = require('axios');
const History = require('../models/history');
const router = express.Router();

router.get('/advice', async (req, res) => {
	try {
		const response = await axios.get('https://api.adviceslip.com/advice');
		const advice = response.data.slip.advice;

		await saveHistory(req, 'Get advice', 'Success');

		res.json({ advice });
	} catch (error) {
		console.error('Error fetching advice:', error);

		await saveHistory(req, 'Get advice', 'Error');

		res.status(500).json({ error: 'Internal Server Error' });
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