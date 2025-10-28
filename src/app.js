import { WeatherService } from './WeatherService.js';
import { UIManager } from './UIManager.js';
import { StorageManager } from './StorageManager.js';

// single instances of each class
const weatherService = new WeatherService();
const ui = new UIManager();
const storage = new StorageManager();

// DOM elements
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');

// get weather for thy city and update UI
async function fetchAndRender(city, save = true) {
  if (!city) return;

  ui.renderError('Loading...'); // show temporary message

  try {
    const data = await weatherService.fetchWeather(city); // fetch from API
    ui.renderWeather(city, data); // update UI

    if (save) {
      // save city locally and show da buttons
      const recentCities = storage.saveLocal(city);
      ui.renderRecentCities(recentCities, fetchAndRender);

      // save to cloud 
      storage.saveCloud(city);
    }

  } catch (err) {
    console.error(err);
    ui.renderError('Failed to fetch weather. Try again.');
  }
}

// listen for actionz
searchBtn.addEventListener('click', () => fetchAndRender(cityInput.value.trim()));
cityInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') fetchAndRender(cityInput.value.trim());
});

async function init() {
  // load recent cities from cloud!
  let recentCities = await storage.loadCloud();
  if (!recentCities || recentCities.length === 0) recentCities = storage.loadLocalArray();

  // show buttons
  ui.renderRecentCities(recentCities, fetchAndRender);

  // auto search last city
  const lastCity = recentCities[0];
  if (lastCity) {
    cityInput.value = lastCity;
    await fetchAndRender(lastCity, false);
  }

  // refresh last city every 5 min in background as required by rubric
  if (lastCity) {
    setInterval(async () => {
      try {
        const freshData = await weatherService.fetchWeather(lastCity);
        if (freshData) ui.renderWeather(lastCity, freshData);
      } catch {
        console.warn('Background refresh failed.');
      }
    }, 5 * 60 * 1000);
  }
}

// start app
init();









