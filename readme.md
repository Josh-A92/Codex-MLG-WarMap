# MLG WarMap

> An interactive, data-driven strategic map for X-Clash.

---

# Vision

MLG WarMap aims to become the definitive strategic planning and intelligence platform for X-Clash.

Rather than simply displaying the game world, the application provides a live strategic overview of an entire Kingdom, allowing players to visualise ownership, analyse territory, review historical changes and coordinate large-scale operations.

The project is designed around one core principle:

> Accuracy before appearance.

If a choice must be made between making the map look better or making it more accurate to the game, accuracy always wins.

---

# Current Development Status

Current Version

**v0.1 - Foundation**

Completed

- ✅ Season 1 blueprint verified against Excel
- ✅ 20 × 20 map layout confirmed
- ✅ Structure locations verified
- ✅ Ice Mist terrain selected
- ✅ Initial sprite artwork completed
- ✅ Prototype HTML renderer

Current Focus

- Sprite integration
- Project restructuring
- Code modularisation

---

# Project Objectives

The finished application should provide:

- Accurate strategic map
- Interactive UI
- Ownership visualisation
- Historical playback
- Intelligence notes
- Strategic reports
- Search
- Zoom and camera controls
- Future support for automated updates

---

# Design Philosophy

## 1. Data Driven

The renderer should be generated from structured map data.

The renderer should never rely on manually positioning structures.

---

## 2. Accuracy First

The Excel blueprint is the source of truth.

If the renderer differs from the blueprint, the renderer is wrong.

---

## 3. Modular Design

Project components should remain independent.

- HTML controls layout.
- CSS controls appearance.
- JavaScript controls behaviour.
- JSON stores map data.
- Sprites provide artwork.

Each layer should remain separate.

---

## 4. Incremental Development

Large rewrites should be avoided.

Every change should be:

- small
- testable
- reversible

---

## 5. Consistent Visual Style

All buildings should use the approved Sprite Pack.

Visual consistency is preferred over adding unnecessary detail.

---

# Project Structure

```
MLG WarMap/
│
├── assets/
│    └── sprites/
│
├── data/
│
├── docs/
│
├── src/
│
├── index.html
│
└── README.md
```

---

# Structure Codes

| Code | Structure |
|------|-----------|
| V1 | Village |
| C2 | Mine |
| MN3 | Manor |
| F4 | Factory |
| T5 | Town |
| MP6 | Metropolis |
| RC7 | Royal City |
| FM1-FM10 | Frost Mine |

---

# Development Roadmap

## Phase 1

Foundation

- Project structure
- Renderer
- Data

## Phase 2

Map Rendering

- Grid
- Terrain
- Sprites
- Frost Mines

## Phase 3

Camera

- Zoom
- Pan
- Fit to Screen

## Phase 4

Ownership

- Territory colours
- Borders
- Selection
- Highlights

## Phase 5

Interface

- Legend
- Filters
- Activity
- Selected objective
- Intelligence

## Phase 6

History

- Timeline
- Playback
- Capture history

## Phase 7

Reports

- Statistics
- Union summaries
- Strategic analysis

## Phase 8

Automation

- Faster data updates
- External integrations
- Future API support

---

# Development Rules

The following rules should always be respected.

1. Preserve the verified Excel blueprint.
2. Never move structures without updating the blueprint.
3. Never redesign approved artwork without approval.
4. Keep code modular.
5. Prioritise readability over cleverness.
6. Build features incrementally.
7. Test each change before moving on.

---

# About This Project

This project is developed as both a strategic planning tool and a long-term software engineering project.

Every feature should improve either:

- accuracy
- usability
- maintainability
- strategic value

without sacrificing the others.