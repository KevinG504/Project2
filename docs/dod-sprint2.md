# docs/dod-sprint2.md
# Sprint 2 — Definition of Done (MVP Vertical Slice)

**Acceptance Checklist**

- WeatherTrends boots from `index.html`, using plain JS correctly loads all ES modules in `/src` (`app.js`, `WeatherService.js`, `UIManager.js`, `StorageManager.js`, `TrendVisualizer.js`, `config.js`).  
- Core loop: User enters a city → `WeatherService` fetches current + tomorrow weather → `UIManager` renders text + trend bars → `StorageManager` saves city locally → optional JSONBin sync. Recent city buttons reload weather correctly.  
- Local-first boot: reads recent cities from **cloud (JSONBin) first; if missing, falls back to localStorage**. Background refresh updates last city every 5 min.  
- Implements ≥3 classes (`WeatherService`, `UIManager`, `StorageManager`) and ≥6 ES modules.  
- UI handles error / loading states correctly.  
- Evidence: Screenshots in `docs/media/`, project board updates, commit/tag history, run instructions updated.
