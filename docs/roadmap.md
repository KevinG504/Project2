# docs/roadmap.md
# Roadmap

## Sprint 1 - Setup and Planning (Roadmap Only)
**Goal:** Setup the repo and define what needs to be implemented to create WeatherTrends. This includes the basics for fetching/rendering weather, as well as the polishing bits for Sprint 3.  

**Deliverables:**  
- Repo boots (`index.html`, `/src` modules; run with `npx http-server` or `npm run dev`)  
- MVP chosen (core features for Sprint 2, polish & enhancements for Sprint 3)  
- Roadmap documented here  
- Project board created with ~8–12 Sprint 2 issues and columns: Backlog, Sprint 2, Sprint 3, Done. Link added in README.  

---

## MVP (Sprint 2)

**Goal 1:** Set up the repo, dependencies, and basic JS module structure.  
**Goal 2:** Render the input box, search button, and empty weather container.  
**Goal 3:** Fetch weather data for a city (current + tomorrow) via `WeatherService`.  
**Goal 4:** Render data as text and horizontal trend bar using `UIManager` + `TrendVisualizer`.  
**Goal 5:** Save recent cities locally (`StorageManager`) and render them as clickable buttons (`UIManager`).  
**Goal 6:** Background refresh for last searched city every 5 min.  
**Goal 7:** Handle errors and loading states.  
**Goal 8:** Ensure vertical slice runs: input → state → render → GET → optional PUT to JSONBin.

---

## Full Version (Sprint 3)

- Support multiple input modes: search button, Enter key, recent city buttons.  
- Responsive layout: works on laptop ≥1280×720 and tablet ≥768px.  
- Final README updated with architecture, module responsibilities, endpoints, run instructions.  
- Deploy to GitHub Pages and/or verify local run works for reviewers.  
- Optional visual polish: trend bar colors, smoother font sizing, spacing improvements.  

---

## Risks & Mitigations

1. **API failures / network errors →** Mitigation: show error message, retry fetch, use cached data.  
2. **LocalStorage sync issues →** Mitigation: ensure `StorageManager` writes then reads correctly, fallback to local first.  
3. **UI misalignment on smaller screens →** Mitigation: test on laptop & tablet viewports, adjust CSS flex/grid for responsiveness.


