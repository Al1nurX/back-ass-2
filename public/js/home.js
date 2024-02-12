async function getWeather(city) {
	try {
		const response = await fetch(`/weather?city=${city}`);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching weather data:', error);
		throw error;
	}
}

async function displayWeather() {
	const city = document.getElementById('cityInput').value;
	try {
		const weatherData = await getWeather(city);
		const weatherDisplay = document.getElementById('weatherData');
		weatherDisplay.innerHTML = `
					<h2>Weather Information for ${weatherData.city}, ${weatherData.country}</h2>
					<p>Temperature: ${weatherData.temperature}°C</p>
					<p>Description: ${weatherData.description}</p>
					<p>Humidity: ${weatherData.humidity}%</p>
					<p>Pressure: ${weatherData.pressure} hPa</p>
					<p>Wind Speed: ${weatherData.windSpeed} m/s</p>
					<p>Rain Volume (last 3 hours): ${weatherData.rainVolume} mm</p>
			`;
		updateMap(weatherData.coord.lat, weatherData.coord.lon);
	} catch (error) {
		console.error('Error displaying weather data:', error);
	}
}

const fetchAdviceBtn = document.getElementById('fetchAdviceBtn');
const adviceDisplay = document.getElementById('adviceDisplay');

fetchAdviceBtn.addEventListener('click', () => {
	fetch('/api/advice')
		.then(response => response.json())
		.then(data => {
			adviceDisplay.textContent = data.advice;
		})
		.catch(error => {
			console.error('Error fetching advice:', error);
		});
});