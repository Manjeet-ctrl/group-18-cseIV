const express = require('express')
const connectDB = require('./db');
const authRoutes = require('./routes/auth'); // Auth routes
const session = require('express-session');
const portfolioRoutes = require('./routes/portfolio');
require('dotenv').config();

const app = express()
const port = 3000

connectDB();
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(
	session({
		secret: 'Rishabh1', // Use a strong secret key for session management
		resave: false,
		saveUninitialized: false,
	})
);
app.use('/auth', authRoutes);  // Authentication routes (login/register)
app.use('/portfolio', portfolioRoutes);

app.get('/', (req, res) => {
	res.render('index', { title: 'Portfolio' });


});

app.get('/about', (req, res) => {
	res.render('about', { title: 'about' });

});


app.listen(port, () => {
	console.log(`Listening on http://localhost:${port}`);

});
