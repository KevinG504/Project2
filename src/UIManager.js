import { renderTrendBar } from './TrendVisualizer.js'; //draw temperature bars

export class UIManager {
  constructor() {
    // grab all thy main DOM elements to update
    this.cityNameEl = document.getElementById('city-name');
    this.conditionEl = document.getElementById('condition');
    this.tempEl = document.getElementById('current-temp');
    this.windEl = document.getElementById('wind');
    this.tomorrowEl = document.getElementById('tomorrow-temp');
    this.weatherContainer = document.getElementById('weather-container');

    // container for last searched city buttons
    this.recentContainer = document.getElementById('recent-cities');
  }

  // update weather display with current city data 
  renderWeather(city, data) {
    this.cityNameEl.textContent = city; // show city name
    this.conditionEl.textContent = `Condition: ${data.condition}`; // show weather condition
    this.tempEl.textContent = `Current Temp: ${data.temp}°C`; // current temp
    this.windEl.textContent = `Wind: ${data.wind} km/h`; // wind speed
    this.tomorrowEl.textContent = `Tomorrow Temp: ${data.tomorrowTemp}°C`; // tomorrow's temp

    // draw trend bars
    if (this.weatherContainer) { // check element exists
      this.weatherContainer.innerHTML = `
        <div style="text-align:center; max-width:400px; margin:10px auto;">
          <h3>Temperature Trend</h3>
          ${renderTrendBar(data.temp, data.tomorrowTemp)} 
        </div>
      `;
    }
  }

  //show an error message instead of weather 
  renderError(message) {
    this.cityNameEl.textContent = ''; 
    this.conditionEl.textContent = message; // main error text
    this.tempEl.textContent = '';
    this.windEl.textContent = '';
    this.tomorrowEl.textContent = '';
    
    if (this.weatherContainer) { 
      this.weatherContainer.innerHTML = ''; // clear trend bars
    }
  }

  // render buttons for last 3 searched cities
  renderRecentCities(cities = [], onClick) {
    if (!this.recentContainer) return; // safety check
    this.recentContainer.innerHTML = ''; // clear old buttons

    cities.forEach(city => {
      const btn = document.createElement('button'); // make button
      btn.textContent = city; // show city name
      btn.style.margin = '0 5px 5px 0'; // spacing
      btn.addEventListener('click', () => onClick(city)); // handle click
      this.recentContainer.appendChild(btn); // add to DOM
    });
  }
}

