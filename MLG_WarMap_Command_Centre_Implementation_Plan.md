# MLG WarMap: Command Centre + Server Workspace Plan

## Product Direction Update

MLG WarMap should be treated as a strategic season platform rather than only a single interactive map viewer.

The application should introduce a home workspace called **Command Centre**. The Command Centre acts as the front page for Season 1 and provides a season-wide strategic overview across all participating servers/kingdoms.

Season 1 currently expects eight server/kingdom map workspaces. These map workspaces should remain based on the verified Season 1 map blueprint, while server-specific state such as ownership, notes, objectives, history, and scoring is stored separately per server.

Recommended workspace model:

```text
Command Centre
Server 366
Server 367
Server 368
Server 369
Server 370
Server 371
Server 372
Server 373
```

Server numbers can be placeholders if the final server list is not yet confirmed.

---

## Architecture Instructions to Add

### Workspace Navigation

The app should introduce a workspace navigation layer above the current map renderer.

Workspaces:

- `command-centre`: season overview dashboard
- `server-map`: individual map workspace for a specific server/kingdom

The current map renderer should remain responsible for rendering map data only. It should not become responsible for dashboard layout, server navigation, scoring summaries, or future analytics.

### Server State Separation

The verified Season 1 map blueprint should remain the shared base map.

Do not duplicate the full Season 1 map data eight times unless a future requirement proves this necessary.

Instead, use a model like:

```js
baseMap: season1-map.json
servers: [
  {
    id: "server-366",
    label: "Server 366",
    mapId: "season1",
    ownership: {},
    notes: {},
    objectives: [],
    history: []
  }
]
```

Server-specific data should include:

- ownership
- notes
- objectives
- scoring totals
- capture history
- last updated time

### Dashboard/Analytics Separation

Create future-friendly separation between:

- map rendering
- workspace navigation
- server state
- scoring calculations
- dashboard summaries

Future modules may include:

- workspace-controller.js
- server-state-service.js
- scoring-service.js
- dashboard-renderer.js

The exact file names can be adjusted to match the codebase, but these responsibilities should remain separate.

---

## Roadmap Update

Add a new milestone before deeper editing/history work:

### Phase 2.5 - Command Centre and Server Workspaces

Planned:

- Command Centre front page
- Eight Season 1 server/kingdom map workspaces
- Bottom-left server dock outside the map viewport
- Dashboard cards for each server
- Clickable server cards that open the relevant map workspace
- Shared base map with per-server state
- Active workspace state
- Active server state
- Initial strategic summary cards

Strategic summaries should support:

- active server
- active union
- Ice Crystal total
- tiles owned
- territory percentage
- structure totals by type
- captured vs available structures

---

## UI Style Guide Update

### Command Centre

The Command Centre should feel like the operational headquarters for the season.

Priorities:

- readable before decorative
- strategic information before visual flair
- low clutter
- quick navigation to maps
- consistent spacing with the existing Ice Mist / MLG Purple visual direction

### Server Dock

Server navigation should sit at the bottom-left, just outside the map viewport.

The dock should:

- show Command Centre/Home
- show the eight Season 1 servers
- highlight the active workspace/server
- be compact
- not cover the map
- remain usable on smaller screens

Example:

```text
[Command]
[366]
[367]
[368]
[369]
[370]
[371]
[372]
[373]
```

### Strategic Summary Cards

Dashboard cards should be glanceable.

Example:

```text
Server 366
MLG
5,000 Ice Crystals

Tiles Owned: 184 / 400
Territory: 46.0%

Frost Mines: 12 captured, 4 available
Metropolis: 3 captured, 1 available
Royal City: 0 captured, 1 available

[Open Map]
```

---

## Data Format Update

Add a future server state model:

```json
{
  "seasonId": "season-1",
  "baseMapId": "season1-map",
  "servers": [
    {
      "id": "server-366",
      "label": "Server 366",
      "activeUnionId": "union-0001",
      "ownership": {},
      "notes": {},
      "objectives": [],
      "history": [],
      "lastUpdated": null
    }
  ]
}
```

Add a future scoring rules model:

```json
{
  "currencyLabel": "Ice Crystals",
  "structures": {
    "Frost Mine": 0,
    "Town": 0,
    "Metropolis": 0,
    "Royal City": 0
  },
  "territoryTile": 0
}
```

Point values should be data-driven and updated when verified values are known.

---

## Decisions Update

### ADR: Command Centre as Primary Workspace

Decision:

MLG WarMap will include a Command Centre as the first workspace/home page.

Reason:

The project is evolving from a single-map viewer into a season-wide strategic planning platform. A Command Centre creates a natural home for server comparison, scoring summaries, objectives, alerts, and future analytics.

### ADR: Shared Base Map with Per-Server State

Decision:

Season 1 servers should share the verified base map and store ownership, notes, objectives, scoring, and history separately per server.

Reason:

Season 1 uses identical maps. Sharing the base map protects the verified blueprint, avoids unnecessary duplication, and allows each server to evolve independently.

### ADR: Server Dock Outside Map Viewport

Decision:

Server navigation should sit in a bottom-left dock just outside the map viewport.

Reason:

This keeps server switching close to the map while avoiding map obstruction and preserving the top bar for global controls.

---

## Testing Update

Add checks:

- Command Centre loads by default.
- Server dock appears bottom-left outside the map viewport.
- Selecting a server opens the correct map workspace.
- Returning to Command Centre works.
- Active workspace/server has a clear visual state.
- Map rendering remains unchanged when switching workspace.
- Ownership and selection behaviour do not leak between servers once per-server state is introduced.
- Dashboard card totals match source data.
- No console errors.
- Layout remains usable at common desktop window sizes.

---

# Visual Studio Code / Codex Implementation Plan

## Milestone 1: Documentation Only

Goal:
Update markdown files so the new direction is recorded before code changes begin.

Prompt:

```text
Read the project documentation and update it to reflect the new Command Centre and multi-server workspace direction.

Requirements:
- Add Command Centre as the home/front-page workspace for Season 1.
- Add eight Season 1 server/map workspaces.
- Document that Season 1 servers share the verified base map but have separate server-specific state.
- Document that the server dock should sit bottom-left, just outside the map viewport.
- Add strategic summaries: Ice Crystals, tiles owned, territory percentage, and captured vs available structures.
- Update README, ARCHITECTURE, ROADMAP, DECISIONS, DATA_FORMAT, STYLE_GUIDE, TESTING, and CHANGELOG where appropriate.
- Do not change application behaviour yet.
- Keep the wording consistent with the project’s existing documentation style.
- Preserve the project principle: accuracy before appearance.
```

Expected test:

```text
Review the markdown changes only. Confirm no source code, map data, or assets were changed.
```

---

## Milestone 2: Workspace State + Static Navigation Shell

Goal:
Introduce the concept of Command Centre vs server map workspaces without changing map rendering logic.

Prompt:

```text
Implement the first UI shell for workspace navigation.

Requirements:
- Add a Command Centre workspace.
- Add eight server/map workspace buttons using placeholder server labels if exact server numbers are not confirmed.
- Place the workspace/server dock bottom-left, just outside the map viewport.
- Default the app to Command Centre on load.
- Clicking a server opens the existing map view for that server.
- Clicking Command Centre returns to the dashboard view.
- Keep the existing map renderer intact.
- Do not duplicate season1-map.json.
- Do not implement scoring yet.
- Do not implement persistence yet.
- Use clear names for activeWorkspace and activeServer state.
- Update CHANGELOG and TESTING.
```

Regression checks:

```text
- App loads with no console errors.
- Command Centre appears by default.
- Server dock appears bottom-left outside the map viewport.
- Clicking each server shows the map.
- Existing camera controls still display and work.
- Existing tile selection still works.
- Returning to Command Centre hides the map view cleanly.
```

---

## Milestone 3: Command Centre Static Cards

Goal:
Make the dashboard useful before wiring real calculations.

Prompt:

```text
Build the first Command Centre dashboard layout.

Requirements:
- Add a Season 1 overview heading.
- Add one card per server.
- Each card should show server label, active union placeholder, Ice Crystals placeholder, territory placeholder, and structure summary placeholders.
- Each card should include an Open Map action.
- Clicking a card or Open Map switches to that server map workspace.
- Keep data placeholders clearly marked so they are not mistaken for verified values.
- Keep layout readable and consistent with the Ice Mist / MLG Purple style guide.
- Do not implement real scoring calculations yet.
- Update CHANGELOG and TESTING.
```

Regression checks:

```text
- Dashboard cards render correctly.
- Open Map actions route to the correct server.
- Server dock active state updates correctly.
- Map still renders unchanged.
- No console errors.
```

---

## Milestone 4: Server Data Model Foundation

Goal:
Create data structure for per-server state without making advanced features yet.

Prompt:

```text
Introduce a data-driven Season 1 server state foundation.

Requirements:
- Create a JSON data file for Season 1 servers if one does not already exist.
- Include eight server entries.
- Each server should include id, label, baseMapId, activeUnionId, ownership, notes, objectives, history, and lastUpdated fields.
- Use the existing union registry for activeUnionId where appropriate.
- The app should load server list from data rather than hard-coding the dock buttons.
- The map should still use the shared season1-map.json blueprint.
- Do not implement save/load yet.
- Do not implement real history yet.
- Update DATA_FORMAT, ARCHITECTURE, CHANGELOG, and TESTING.
```

Regression checks:

```text
- Server dock is generated from data.
- Dashboard cards are generated from data.
- Switching servers still works.
- No map blueprint duplication.
- No console errors.
```

---

## Milestone 5: Strategic Summary Calculations

Goal:
Calculate useful dashboard summaries from map + server ownership data.

Prompt:

```text
Implement the first strategic summary calculations.

Requirements:
- Add a scoring/summary service separate from the map renderer.
- Calculate tiles owned by active union for the selected server.
- Calculate territory percentage.
- Calculate captured vs available structures by structure type.
- Display these values on the Command Centre server cards and active server summary.
- Add placeholder support for Ice Crystal totals, but only calculate them if verified scoring rules exist.
- Do not invent point values.
- If scoring values are unknown, display 'Scoring rules not configured' or a similar clear placeholder.
- Keep calculations data-driven.
- Update DATA_FORMAT, ARCHITECTURE, CHANGELOG, and TESTING.
```

Regression checks:

```text
- Summary values match map/server data.
- Unknown scoring values are clearly marked as unconfigured.
- Switching servers updates summaries correctly.
- Existing ownership overlays still work.
- No console errors.
```

---

## Milestone 6: UI Polish Pass

Goal:
Make the Command Centre and server dock feel intentional without starting new features.

Prompt:

```text
Polish the Command Centre and server dock UI.

Requirements:
- Improve spacing, hierarchy, and responsiveness.
- Keep visual clutter low.
- Ensure active workspace/server state is obvious.
- Ensure the dock does not cover the map.
- Ensure dashboard cards are readable at common desktop sizes.
- Keep colours consistent with the existing style guide.
- Do not add new features.
- Do not redesign sprites.
- Update UX documentation, CHANGELOG, and TESTING.
```

Regression checks:

```text
- Layout remains readable on desktop and smaller windows.
- Map viewport remains usable.
- Server dock remains outside the map.
- Dashboard cards are legible.
- No console errors.
```
