const express = require('express');
const Portfolio = require('../models/Portfolio');
const router = express.Router();

// Route to serve the portfolio upload page (GET method)
router.get('/upload', (req, res) => {
	if (!req.session.user) {
		return res.redirect('/auth/login'); // Redirect to login if not logged in
	}
	res.render('upload'); // Render the upload form (create 'upload.ejs' view)
});

// Route to handle portfolio submission (POST method)
router.post('/upload', async (req, res) => {
	if (!req.session.user) {
		return res.redirect('/auth/login'); // Redirect to login if not logged in
	}

	const { title, description, skills } = req.body;
	try {
		// Create a new portfolio document and associate it with the logged-in user
		const newPortfolio = new Portfolio({
			user: req.session.user._id, // Associate portfolio with the logged-in user
			title,
			description,
			skills: skills.split(',').map(skill => skill.trim()), // Convert skills to an array
		});

		await newPortfolio.save();

		res.redirect('/portfolio/view'); // Redirect to a page where portfolios are viewed
	} catch (err) {
		console.error(err);
		res.status(500).send('Error while uploading portfolio');
	}
});

router.get('/view', async (req, res) => {
	if (!req.session.user) {
		return res.redirect('/auth/login'); // Redirect to login if not logged in
	}

	try {
		// Find all portfolios belonging to the logged-in user
		const portfolios = await Portfolio.find({ user: req.session.user._id });

		// Render the 'view' page with the list of portfolios
		res.render('view', { portfolios });
	} catch (err) {
		console.error(err);
		res.status(500).send('Error fetching portfolios');
	}
});

module.exports = router;
