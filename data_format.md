# Map Data Format

This project follows a shared-base-map, per-server-state model for Season 1.

## Grid

20 rows

20 columns

Coordinates:

X = 0 → 999

Y = 999 → 0

---

## Tile

Each tile may contain:

Coordinate

Terrain

Structure

Owner

History

Notes

The tile schema is shared across all Season 1 server workspaces.

---

## Structures

Village

Mine

Manor

Factory

Town

Metropolis

Royal City

Future versions may extend this list without changing renderer logic.

---

## Season 1 Workspace Model

Season 1 includes:

- Command Centre workspace (home/front page)
- Eight server/map workspaces

Current data source:

- data/season1-servers.json

All servers share the verified Season 1 base map.

Server-specific strategic data must be stored separately per server.

Recommended shape:

```json
{
	"seasonId": "season-1",
	"baseMapId": "season1-map",
	"workspaceHome": "command-centre",
	"servers": [
		{
			"id": "server-366",
			"label": "Server 366",
			"mapId": "season1-map",
			"ownership": {},
			"notes": {},
			"objectives": [],
			"history": [],
			"scoring": {
				"iceCrystals": null,
				"tilesOwned": 0,
				"territoryPercent": 0,
				"capturedStructures": 0,
				"availableStructures": 0
			},
			"lastUpdated": null
		}
	]
}
```

Required per-server fields:

- id
- label
- baseMapId
- activeUnionId
- ownership
- notes
- objectives
- history
- lastUpdated

`activeUnionId` should reference an id from data/unions.json where appropriate.

Server dock buttons and Command Centre dashboard cards should be generated from this server data rather than hard-coded in HTML.

### Strategic Summary Fields

Strategic summaries should support:

- Ice Crystals
- tiles owned
- territory percentage
- captured vs available structures

Current implementation notes:

- Dashboard summaries are calculated from shared season1-map.json plus per-server ownership state in data/season1-servers.json.
- Tiles owned are calculated for each server activeUnionId.
- Territory percentage is calculated as tilesOwned divided by totalTiles.
- Structure summaries are calculated by structure type as captured versus available.
- Ice Crystal scoring remains explicitly unconfigured unless verified scoring rules are present; UI should show "Scoring rules not configured".