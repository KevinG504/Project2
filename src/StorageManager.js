import { JSONBIN_URL, JSONBIN_URL_LATEST } from './config.js';

export class StorageManager {
  constructor() {
    this.recentKey = 'recentCities';   
    this.cloudUrl = JSONBIN_URL;   
    this.cloudLatestUrl = JSONBIN_URL_LATEST; // cloud GET URL
    this.masterKey = '$2a$10$aKhGg7ux4BK2rPMSjEo.i.wDbI0kpOCuwtYR299jC8pJ7FBqB/aya'; // cloud key for write
  }

  //Save last 3 cities locally 
  saveLocal(city) {
    const current = this.loadLocalArray(); // get existing
    const updated = [city, ...current.filter(c => c !== city)].slice(0, 3); 
    localStorage.setItem(this.recentKey, JSON.stringify(updated)); // store
    return updated; // return for UI render
  }

  // Load recent cities from local
  loadLocalArray() {
    const data = localStorage.getItem(this.recentKey); // read local
    return data ? JSON.parse(data) : []; // parse or empty
  }

  // Save last 3 cities to bin
  async saveCloud(city) {
    try {
      const cities = this.saveLocal(city); // update local first
      const payload = { timestamp: Date.now(), recentCities: cities };

      const res = await fetch(this.cloudUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': this.masterKey
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error(`JSONBin PUT failed: ${res.status}`);
      console.log('Cloud save successful:', cities);
    } catch (err) {
      console.error('saveCloud error:', err);
    }
  }

  // Load recent cities from JSONBin 
  async loadCloud() {
    try {
      const res = await fetch(this.cloudLatestUrl, {
        headers: { 'X-Master-Key': this.masterKey }
      });

      if (!res.ok) throw new Error(`JSONBin GET failed: ${res.status}`);
      const data = await res.json();
      return data.record?.recentCities || this.loadLocalArray();
    } catch (err) {
      console.error('loadCloud error:', err);
      return this.loadLocalArray(); // fallback
    }
  }
}






