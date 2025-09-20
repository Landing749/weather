const API_KEY = 'e352d46dd2b3505bc62101d96fc70e39';
const CITY = 'Manila';

async function fetchWeather() {
    if (navigator.onLine) {
        try {
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=metric&appid=${API_KEY}`);
            const data = await res.json();
            localStorage.setItem('weatherData', JSON.stringify(data));
            localStorage.setItem('lastUpdate', new Date().toLocaleString());
            displayWeather(data);
        } catch (e) {
            useOfflineData();
        }
    } else {
        useOfflineData();
    }
}

function useOfflineData() {
    const data = JSON.parse(localStorage.getItem('weatherData'));
    const last = localStorage.getItem('lastUpdate');
    if (data) {
        displayWeather(data, last);
    } else {
        document.getElementById('temp').innerText = '--°C';
        document.getElementById('desc').innerText = 'No data offline';
        document.getElementById('lastUpdate').innerText = '';
        document.getElementById('weather-icon').innerText = '❓';
        document.body.className = '';
    }
}

function displayWeather(data, lastUpdate=null) {
    const temp = data.main.temp;
    const desc = data.weather[0].main.toLowerCase();
    document.getElementById('temp').innerText = `${temp}°C`;
    document.getElementById('desc').innerText = data.weather[0].description;
    document.getElementById('lastUpdate').innerText = lastUpdate ? `Last update: ${lastUpdate}` : `Last update: ${new Date().toLocaleString()}`;

    const iconEl = document.getElementById('weather-icon');
    let bodyClass = '';
    if (desc.includes('cloud')) { iconEl.innerText = '☁️'; bodyClass = 'cloudy'; }
    else if (desc.includes('rain')) { iconEl.innerText = '🌧️'; bodyClass = 'rainy'; }
    else if (desc.includes('snow')) { iconEl.innerText = '❄️'; bodyClass = 'snowy'; }
    else { iconEl.innerText = '☀️'; bodyClass = 'sunny'; }

    document.body.className = bodyClass;
}

fetchWeather();
