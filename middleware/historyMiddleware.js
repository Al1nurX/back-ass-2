const History = require('../models/history');

function captureHistory(user, request, outcome) {
	const historyData = new History({
		user: user,
		request: request,
		outcome: outcome
	});

	historyData.save()
		.then(() => console.log('History saved successfully'))
		.catch(error => console.error('Error saving history:', error));
}

module.exports = captureHistory;