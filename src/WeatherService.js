import { METEO_URL, NOMINATIM_URL } from './config.js'; // API URLs

export class WeatherService {
  constructor() {
    this.cache = {}; // store weather data temporarily
    this.TTL = 5 * 60 * 1000; // 5 min cache duration
  }

  // convert API weather code to text 
  getConditionText(code) {
    if (code === 0) return 'Clear';
    if (code <= 2) return 'Partly Cloudy';
    if (code === 3) return 'Overcast';
    if (code >= 45 && code < 60) return 'Fog/Rain';
    if (code >= 61 && code < 80) return 'Rain';
    if (code >= 80 && code < 95) return 'Showers';
    if (code >= 95) return 'Thunderstorm';
    return 'Unknown';
  }

  // fetch weather for a city and use da cache if fresh 
  async fetchWeather(city) {
    const now = Date.now();

    // return cached data if still valid
    const cached = this.cache[city];
    if (cached && now - cached.timestamp < this.TTL) return cached.data;

    try {
      // get city cords
      const geoRes = await fetch(NOMINATIM_URL(city));
      if (!geoRes.ok) throw new Error('Geocoding API error');
      //city not found error check
      const geoData = await geoRes.json();
      if (!geoData || geoData.length === 0) throw new Error('City not found');

      const { lat, lon } = geoData[0];

      // get weather from API
      const weatherRes = await fetch(METEO_URL(lat, lon));
      if (!weatherRes.ok) throw new Error('Weather API error');

      const weatherData = await weatherRes.json();
      const current = weatherData.current_weather;
      const daily = weatherData.daily;

      // extract data
      const data = {
        temp: current.temperature,
        wind: current.windspeed,
        condition: this.getConditionText(current.weathercode),
        tomorrowTemp: daily.temperature_2m_max[1],
      };

      // cache it
      this.cache[city] = { data, timestamp: now };

      return data;
    } catch (err) {
      console.error('fetchWeather error:', err);
      throw new Error('API error');
    }
  }

  //refresh
  async refreshWeather(city) {
    try {
      return await this.fetchWeather(city);
    } catch {
    }
  }
}



