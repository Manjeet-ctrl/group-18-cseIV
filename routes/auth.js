const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Import User model
const router = express.Router();

router.get('/register', (req, res) => {
	res.render('register'); // Render the registration form (create a 'register.ejs' view)
});
router.get('/login', (req, res) => {
	res.render('login'); // Render the login form (create a 'login.ejs' view)
});

router.post('/register', async (req, res) => {
	const { username, email, password } = req.body;
	try {
		// Check if user already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).send('User already exists');
		}

		// Create a new user and hash the password
		const newUser = new User({ username, email, password });
		await newUser.save();

		// Redirect to the login page after successful registration
		res.redirect('/auth/login');
	} catch (err) {
		console.error(err);
		res.status(500).send('Server error during registration');
	}
});

router.post('/login', async (req, res) => {
	const { email, password } = req.body;
	try {
		// Find the user by email
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).send('Invalid credentials'); // User not found
		}

		// Compare the entered password with the hashed password in the database
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).send('Invalid credentials'); // Password doesn't match
		}

		// Set session information (store user info in the session)
		req.session.user = user;

		// Redirect to portfolio upload page after successful login
		res.redirect('/portfolio/upload'); // Redirect to the page where the user can upload their portfolio
	} catch (err) {
		console.error(err);
		res.status(500).send('Server error during login');
	}
});

module.exports = router;
