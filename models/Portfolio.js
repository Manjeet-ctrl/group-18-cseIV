const mongoose = require('mongoose')
const portfolioSchema = new mongoose.Schema({

	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	title: String,
	description: String,
	skills: [String],
	createdAt: { type: Date, default: Date.now },
});

const Portfolio = mongoose.model('Portfolio', portfolioSchema);
module.exports = Portfolio;
