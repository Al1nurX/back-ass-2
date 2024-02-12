const express = require('express');
const database = require('./models/db');
const User = require('./models/user');
const adminRoutes = require('./routes/adminRoutes');
const homeRoutes = require('./routes/homeRoutes');
const weatherRoutes = require('./routes/weatherRoutes');
const { getWeatherData } = require('./services/weatherService');

const app = express();
const PORT = 3000;

let userIdCounter = 1;

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use('/', homeRoutes);
app.use('/', adminRoutes);

app.use('/weather', weatherRoutes);

app.get('/', (req, res) => {
	res.render('login');
});

app.get('/signup', (req, res) => {
	res.render('signup');
});

app.post('/signup', async (req, res) => {
	const { name, password } = req.body;

	try {
		const existingUser = await User.findOne({ name });

		if (existingUser) {
			return res.send("User already exists. Please choose a different name.");
		} else {
			const creationDate = new Date();
			const isAdmin = name === 'alinur';
			const userData = await User.create({
				userId: userIdCounter++,
				name,
				password,
				creationDate,
				admin: isAdmin
			});
		}

		return res.redirect('/home');

	} catch (error) {
		console.error('Error signing up:', error);
		return res.status(500).send('An error occurred while signing up.');
	}
});

app.post('/login', async (req, res) => {
	const { name, password } = req.body;

	try {
		const user = await User.findOne({ name });

		if (!user) {
			return res.send('User not found.');
		}

		if (password === user.password) {
			if (user.admin) {
				return res.redirect('/admin');
			} else {
				return res.redirect('/home');
			}
		} else {
			return res.send('Wrong password.');
		}

	} catch (error) {
		console.error('Error logging in:', error);
		return res.status(500).send('An error occurred while logging in.');
	}
});

app.post('/weather', async (req, res) => {
	try {
			const { city } = req.body;
			const weatherData = await getWeatherData(city);
			console.log(weatherData); 
			res.render('home', { weather: weatherData }); 
	} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'Internal Server Error' });
	}
});

database();

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
})
