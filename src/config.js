export const JSONBIN_URL = 'https://api.jsonbin.io/v3/b/68ffb2b6d0ea881f40c02df8'; //bin url
export const JSONBIN_URL_LATEST = 'https://api.jsonbin.io/v3/b/68ffb2b6d0ea881f40c02df8/latest'; //fetch most recent cities

export const METEO_URL = (lat, lon) => //get forecast
  `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max&timezone=auto`;

export const NOMINATIM_URL = (city) => //get coordinates for city
  `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)}&format=json&limit=1`;
