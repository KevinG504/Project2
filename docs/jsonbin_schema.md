# docs/jsonbin_schema.md
# JSONBin Schema & Merge Policy

## Schema

Each user’s document in JSONBin tracks recent city searches synced from the app.

```json
{
  "timestamp": 0,
  "recentCities": []
}
```

**Field Descriptions:**
- `timestamp`:  Updated each time the app uploads to JSONBin to record the last sync time.
- `recentCities`: An array of city names, ordered from most recent to oldest. The app limits this to a maximum of 3 entries.

---

## Examples

### Example — PUT payload
```json
{
  "timestamp": 1730075600000,
  "recentCities": ["Austin", "Dallas", "Houston"]
}
```

### Example — Result from GET
```json
{
  "timestamp": 1730075600000,
  "recentCities": ["Austin", "Dallas", "Houston"]
}
```

---

## Merge Policy

- **Source of Truth:** Cloud data is read first on boot; if unavailable, the app falls back to `localStorage`.  
- **Conflict Resolution:**  
  - Uses a **last-write-wins** strategy based on the numeric `timestamp` value.  
  - If both local and cloud have data, whichever has the newer `timestamp` overwrites the other.  
- **Deduplication:** Duplicate city names are removed when merging, preserving most recent order.  
- **Capacity Limit:** The `recentCities` array is trimmed to the 3 most recent entries before upload.

