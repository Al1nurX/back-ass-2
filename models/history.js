const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
	user: { type: String, required: true },
	request: { type: String, required: true },
	outcome: { type: String, required: true },
	timestamp: { type: Date, default: Date.now }
});

const History = mongoose.model('History', historySchema);

module.exports = History;