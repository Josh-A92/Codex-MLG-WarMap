# WarMap Data Architecture v1.0

## Status

Draft architecture specification.

This document defines the intended data architecture for the MLG WarMap project. It is designed to support multiple seasons, multiple server or kingdom maps, changing map layouts, changing structure types, changing scoring rules, and future collaborative editing.

Season-specific assumptions must be stored as configuration rather than embedded permanently in the application.

---

## 1. Architectural goal

A new season should be creatable primarily by adding or editing data, rules, and visual assets.

The renderer, ownership engine, navigation system, history system, and persistence layer should not require redesign whenever the game changes its map, structures, resources, or number of participating kingdoms.

The key design test is:

> Can a new season be added without rewriting the core application?

---

## 2. Core separation

The application should separate data into three layers:

```text
Core Application
    ↓
Season Configuration
    ↓
Map Instance State
```

### 2.1 Core application

Stable systems that should work across seasons:

- rendering
- navigation
- selection
- ownership handling
- validation
- scoring and production calculations
- history and audit logging
- permissions
- persistence
- import and export
- dashboard aggregation

### 2.2 Season configuration

Data that defines how a particular season works:

- season identity
- map blueprint or blueprints
- coordinate system
- terrain and territory definitions
- structure catalogue
- resource catalogue
- scoring rules
- production rules
- ownership rules
- capture rules
- participating unions
- number of map instances
- dashboard metric definitions
- visual theme
- dates and phases

### 2.3 Map instance state

Live data that differs between individual kingdom or server maps:

- map identity
- server or kingdom identity
- ownership
- current production
- notes
- markers
- objectives
- update timestamps
- history
- calculated summaries

---

## 3. Primary domain model

```text
Season
├── Ruleset
├── Resource Catalogue
├── Structure Catalogue
├── Union Participation
├── Visual Theme
├── Map Blueprints
└── Map Instances
```

A map blueprint defines the static world.

A map instance applies live state to that blueprint.

---

## 4. Season

Each season should have a stable internal identity.

Suggested fields:

```json
{
  "id": "season-2",
  "name": "Season 2",
  "status": "draft",
  "startDate": null,
  "endDate": null,
  "defaultBlueprintId": "season-2-main-map",
  "mapInstanceIds": [],
  "participatingUnionIds": [],
  "rulesetId": "season-2-rules",
  "themeId": "season-2-theme"
}
```

The season should not assume:

- exactly eight maps
- a fixed grid size
- one resource type
- a fixed list of unions
- Season 1 structure types
- fixed dashboard cards

---

## 5. Map identity

The internal map record should be treated as a **map instance**.

Its stable ID must be separate from its visible server or kingdom label.

Example:

```json
{
  "id": "season-2-map-04",
  "seasonId": "season-2",
  "blueprintId": "season-2-main-map",
  "serverNumber": 412,
  "label": "Server 412",
  "status": "active"
}
```

This allows:

- a different number of maps each season
- server numbers to recur in later seasons
- placeholder maps before final server identities are known
- maps to be renamed without breaking stored references
- multiple maps to share one blueprint

---

## 6. Map blueprint

A map blueprint contains only static layout information.

It should not contain live ownership.

Suggested structure:

```json
{
  "id": "season-2-main-map",
  "seasonId": "season-2",
  "name": "Season 2 Main Map",
  "geometryType": "node-region",
  "coordinateSystem": {},
  "terrain": [],
  "regions": [],
  "routes": [],
  "structures": [],
  "labels": [],
  "visualAssets": {}
}
```

### 6.1 Geometry types

The application should not treat every map as a square grid.

Supported geometry should be extensible:

```text
grid
node-region
polygon
hybrid
```

#### Season 1

Likely represented as:

```text
grid
```

#### Season 2

Provisionally represented as:

```text
node-region
```

This remains provisional until the full Season 2 rules are confirmed.

---

## 7. Coordinate system

Each blueprint should define its coordinate model.

Possible fields:

```json
{
  "originX": 0,
  "originY": 0,
  "maxX": 999,
  "maxY": 999,
  "xDirection": "right",
  "yDirection": "down",
  "displayFormat": "X:{x} Y:{y}"
}
```

The system should support:

- different map dimensions
- non-square coordinate ranges
- coordinates beginning at zero or one
- inverted Y axes
- logical game coordinates distinct from screen pixels
- blocked or unavailable areas

---

## 8. Territory and regions

Territory should be represented as map entities rather than being permanently tied to square tiles.

A territory entity may be:

- a square grid cell
- an irregular polygon
- a predefined region
- a structure footprint
- an uncapturable zone
- a decorative area

Suggested fields:

```json
{
  "id": "territory-001",
  "geometry": {},
  "terrainTypeId": "desert",
  "regionId": "central-zone",
  "capturable": true,
  "baseValue": 0
}
```

Ownership belongs in map instance state, not in the blueprint.

---

## 9. Routes and connections

Season 2 appears to use connected paths between structures and territory areas.

The blueprint should support explicit connections:

```json
{
  "id": "route-001",
  "fromEntityId": "village-01",
  "toEntityId": "mine-02",
  "direction": "both",
  "routeType": "land"
}
```

This can later support:

- route rendering
- adjacency checks
- capture prerequisites
- progression planning
- reachable-objective calculations

No capture dependency should be assumed until the game rules confirm it.

---

## 10. Structure catalogue

Structure types should be defined separately from structure instances.

Example catalogue entry:

```json
{
  "id": "mine",
  "name": "Mine",
  "category": "resource",
  "supportsLevels": true,
  "supportsProduction": true,
  "supportsOwnership": true,
  "spriteSetId": "season-2-mines"
}
```

Potential structure types observed or anticipated include:

- mine
- union city
- village
- manor
- trade centre
- union rally point

These should not all be reduced to one generic building type if their rules differ.

---

## 11. Structure instances

A structure instance is a specific structure placed on a blueprint.

Example:

```json
{
  "id": "mine-412-500",
  "typeId": "mine",
  "level": 6,
  "coordinate": {
    "x": 412,
    "y": 500
  },
  "footprint": {},
  "properties": {
    "resourceId": "red-resource",
    "productionRatePerHour": 3456
  }
}
```

The structure name should not encode its level.

Level, production, score, and other values should be explicit fields or derived from season rules.

---

## 12. Resource catalogue

Resources must be configurable.

Suggested fields:

```json
{
  "id": "red-resource",
  "name": "Red Resource",
  "unit": "per-hour",
  "iconAssetId": "resource-red"
}
```

The system should support:

- static points
- hourly production
- multiple resources
- season-specific terminology
- resource icons
- resource totals by union and map

“Ice Crystals” must not become a permanent hard-coded field.

---

## 13. Scoring and production rules

The ruleset should distinguish between static value and time-based production.

Possible rule types:

- value per territory
- value per structure
- production per structure level
- region-completion bonus
- connected-territory bonus
- penalties
- multipliers
- manual adjustments

Example:

```json
{
  "structureTypeId": "mine",
  "level": 6,
  "resourceId": "red-resource",
  "productionRatePerHour": 3456
}
```

Calculated results should be derived from:

```text
ruleset
+
blueprint
+
map instance ownership
```

They should not be manually duplicated in dashboard records.

---

## 14. Union registry

Unions should exist independently of seasons.

Suggested fields:

```json
{
  "id": "mlg",
  "name": "Moonlight Guillotine",
  "shortName": "MLG",
  "defaultColour": "#...",
  "status": "active"
}
```

A season participation record should then define:

```json
{
  "seasonId": "season-2",
  "unionId": "mlg",
  "displayColourOverride": null,
  "status": "participating",
  "serverAffiliations": []
}
```

This supports:

- unions joining or leaving between seasons
- new unions
- mergers or renames
- consistent colours across maps
- season-specific colour overrides
- historical preservation

---

## 15. Ownership state

Ownership should be stored per map instance.

It must not be written into the shared blueprint.

Example:

```json
{
  "mapInstanceId": "season-2-map-04",
  "entityId": "territory-001",
  "ownerUnionId": "mlg",
  "status": "owned",
  "updatedAt": "2026-07-23T16:00:00Z"
}
```

Supported statuses should be extensible:

- unassigned
- owned
- contested
- allied
- shared
- locked
- uncapturable

The initial UI may expose only the statuses currently needed.

---

## 16. Dashboard architecture

The Command Centre should calculate summaries from map instance state.

It should not store duplicate ownership totals as authoritative data.

Possible calculated metrics:

- total territories owned
- territory percentage
- structures owned by type
- structures available by type
- static score
- hourly production by resource
- contested entities
- recent ownership changes
- last updated time

Each season should define which dashboard metrics are visible.

Example:

```json
{
  "id": "mine-production",
  "label": "Mine Production",
  "calculation": "productionByStructureType",
  "structureTypeId": "mine",
  "resourceId": "red-resource"
}
```

---

## 17. History and audit trail

The application should preserve both:

```text
Current state
Change history
```

Each mutation should record:

```json
{
  "id": "change-001",
  "seasonId": "season-2",
  "mapInstanceId": "season-2-map-04",
  "entityId": "territory-001",
  "field": "ownerUnionId",
  "previousValue": null,
  "newValue": "mlg",
  "changedBy": "user-id",
  "changedAt": "2026-07-23T16:00:00Z",
  "reason": null
}
```

This supports:

- auditing
- rollback
- capture timelines
- change summaries
- future analytics

---

## 18. Notes, markers, and objectives

Map collaboration data should be separate from ownership.

Possible records:

- notes
- markers
- routes
- planned targets
- warnings
- union objectives
- private leadership annotations

Each should reference:

- season
- map instance
- map entity or coordinate
- creator
- visibility level
- timestamps

---

## 19. Permissions

Permissions should not be hard-coded around MLG or a fixed number of elevated users.

Permissions may need to apply by:

- organisation
- season
- map instance
- union
- role
- action

Possible actions:

- view map
- edit ownership
- edit notes
- create markers
- approve changes
- manage unions
- manage seasons
- create map instances
- delete records
- view private notes

---

## 20. Validation

Configurable data must be validated before use.

Examples:

- duplicate IDs
- unknown union references
- unknown structure types
- invalid coordinates
- structures outside map bounds
- incompatible overlaps
- missing sprite assets
- rules referencing missing resources
- ownership assigned to uncapturable entities
- map instances referencing the wrong season blueprint

Validation errors should identify the exact record and field involved.

---

## 21. Import, export, and season creation

The system should eventually support:

- exporting a complete season
- importing a season package
- duplicating a season as a template
- importing map blueprints
- exporting ownership state
- producing backups
- restoring snapshots

A useful future workflow is:

```text
Duplicate previous season
→ replace blueprint
→ update rules
→ update structures
→ update unions
→ create map instances
→ validate
→ publish
```

---

## 22. Persistence strategy

The current application uses JSON loaded into memory.

The architecture should allow a staged transition:

### Stage 1

Local JSON files with separated blueprint and map-instance state.

### Stage 2

Local persistence with reliable save, backup, and history.

### Stage 3

Shared database and authenticated collaboration.

### Stage 4

Web platform with multi-user permissions, synchronization, and APIs.

The domain model should remain consistent across these stages.

---

## 23. Season 1 compatibility

Season 1 should be represented as:

```text
Geometry: grid
Territory: square cells
Structures: fixed footprints
Primary value: Ice Crystals
Ownership: per map instance
```

Existing Season 1 data may require migration from:

```text
tile.ownerId
```

to:

```text
mapInstance ownership records
```

The shared Season 1 blueprint should contain no server-specific ownership.

---

## 24. Season 2 provisional model

Based on currently available screenshots, Season 2 appears likely to require:

```text
Geometry: node-region or hybrid
Structures: cities, mines, villages, manors, trade centres, rally points
Values: structure levels and hourly production
Routes: explicit connections between map entities
Ownership: per kingdom map
```

The following remain unconfirmed:

- whether territory is captured directly
- whether structure ownership controls surrounding territory
- whether routes dictate capture order
- whether production changes over time
- whether ownership limits apply per union or kingdom
- whether every kingdom uses an identical blueprint
- final number of participating kingdoms
- complete resource catalogue
- complete structure catalogue

These must remain marked as unknown until supported by game information.

---

## 25. Immediate implementation implications

The current application should not proceed by cloning the entire map JSON eight times.

The next implementation steps should be:

1. Introduce stable map instance IDs.
2. Separate the shared Season 1 blueprint from ownership state.
3. Resolve the active map instance from `activeServer`.
4. Load and apply ownership for only that map instance.
5. Clear and safely re-render the map when switching instances.
6. Clear selection state when switching maps.
7. Calculate Command Centre summaries from all map instances.
8. Add persistence only after the runtime separation is proven.

---

## 26. Governing principle

The project should treat:

```text
A grid as one possible map geometry,
not as the definition of a map.
```

A map is a collection of entities positioned in a coordinate space, combined with season rules and map-specific live state.

That principle allows the same application to support both Season 1 and the more structurally different Season 2 map without rebuilding the foundation.
