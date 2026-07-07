# MLG WarMap Architecture

## Purpose

This document explains how the application is built and why it is structured this way.

The objective is to allow any future developer or AI assistant to understand the system before making architectural changes.

---

# High Level Architecture

                    User
                      │
                      ▼
                Browser (HTML)
                      │
                      ▼
            Workspace Navigation Layer
            (Command Centre / Server Map)
                      │
                      ▼
            map-renderer.js
                      │
        ┌─────────────┴─────────────┐
        ▼                           ▼
season1-map.json              Sprite Library
      │
      ▼
    unions.json
      │
      ▼
season1-server-state.json
        │                           │
        └─────────────┬─────────────┘
                      ▼
                 Rendered Map

Command Centre summaries are computed from server state + shared map context.

---

# Current Implementation Status

## Completed Phase 1 Interactive Map

The current implementation supports:

- Tile selection
- Selection information panel
- Hover states for empty tiles and structures
- Sprite and marker interaction handling
- Multi-tile structure footprint selection
- Unified visual cells for large structures such as Town, Metropolis and Royal City

The application remains data-driven and continues to use the existing 20 × 20 internal grid.

---

# Layer Responsibilities

## HTML

Responsible only for:

- Application shell
- Layout containers
- Loading CSS
- Loading JavaScript

Should never contain rendering logic.

---

## CSS

Responsible only for presentation.

Examples:

- Colours
- Typography
- Tile styling
- Panels
- Responsive layout

Never stores game data.

---

## JavaScript

Responsible for:

- Reading map data
- Reading union registry data
- Reading Season 1 server state data (data/season1-servers.json)
- Managing workspace state (Command Centre vs active server map)
- Managing per-server state selection
- Centralizing ownership logic in src/services/ownership-service.js
- Creating the grid
- Rendering sprites
- User interaction
- Selection state and detail panel updates
- Future camera system
- Future selection system

Never hard-code map layouts.

---

## JSON

Stores:

- Tile information
- Structure locations
- Union registry data
- Shared Season 1 base map data
- Per-server ownership, notes, objectives, history, scoring, and last-updated data

Current workspace state foundation file:

- data/season1-servers.json

This is the application's data layer.

---

## Assets

Contains:

- Sprites
- Icons
- UI artwork

Should never contain game logic.

---

# Phase 2 Camera Direction

Phase 2 will introduce a camera layer that is designed to be input-independent and device-neutral.

The intended design is documented in docs/CAMERA.md and includes:

- Zoom, pan, fit, reset and focus actions available through mouse, keyboard, trackpad, touch and UI buttons
- Cursor or finger-centred zoom behavior where practical
- Camera transforms applied to a map container rather than repositioning individual tiles or sprites
- Selection remaining independent from camera state
- The internal 20 × 20 grid staying intact while large structures can be presented as single user-facing cells

---

# Future Modules

Renderer

Selection

Camera

Ownership (service layer foundation in src/services/ownership-service.js)

Workspace Controller

Server State Service

Strategic Summary Service

History

Analytics

Reporting

Each module should have a clearly defined responsibility.

---

# Design Philosophy

The renderer should be capable of rendering ANY correctly formatted map.

It should not know anything about Season 1 specifically.

Workspace navigation, strategic summaries, and per-server storage should remain outside the renderer.
---

# Input Independence

WarMap is designed to be device-neutral.

Core functionality should not depend on a specific input device.

Features should be designed around user actions, with equivalent interactions provided wherever practical for:

- Mouse
- Keyboard
- Trackpad
- Touch

Examples:

| Action | Mouse | Trackpad | Touch |
|---------|-------|----------|-------|
| Select | Click | Tap | Tap |
| Pan | Drag | Two-finger drag | Drag |
| Zoom | Mouse Wheel | Pinch | Pinch |
| Reset View | Button | Button | Button |
| Fit Map | Button | Button | Button |

The application should provide a consistent experience across supported devices while allowing each platform to use its own natural interaction methods.

---

# Structure Footprints

The application always stores and understands the world as a logical 20 × 20 grid.

Large structures may occupy multiple logical tiles using footprint information supplied by the map data.

Examples include:

- Town
- Metropolis
- Royal City

For presentation purposes, these structures are rendered as a single user-facing cell.

This means:

- Internal grid lines are hidden within the footprint.
- Internal tile labels are hidden.
- Hover behaves as one structure.
- Selection behaves as one structure.
- The information panel represents the structure as a single object.

The logical grid must remain unchanged for future systems such as ownership, history, analytics and map editing.

---

# Season 1 Workspace Architecture Direction

Season 1 should use:

- One Command Centre home/front-page workspace
- Eight server/map workspaces

All eight server workspaces share the verified Season 1 base map.

Server-specific strategic state must be stored separately per server for:

- ownership
- notes
- objectives
- history
- scoring
- last-updated

This separation preserves blueprint accuracy while allowing each server to evolve independently.

## Server Dock Placement

Workspace/server navigation should sit bottom-left, just outside the map viewport.

This keeps server switching near map interactions without obscuring tiles, structures, or camera interactions.

## Strategic Summary Data

Command Centre and server workspace summaries should support:

- Ice Crystals
- tiles owned
- territory percentage
- captured vs available structures

The first implementation milestone keeps these as explicit placeholders and does not run scoring calculations yet.

---

# Camera Principles

The camera is responsible only for viewing the map.

It must never modify:

- Map data
- Selection state
- Structure data

The camera should expose logical actions rather than responding directly to specific input devices.

Future camera actions include:

- zoomIn()
- zoomOut()
- pan(dx, dy)
- fit()
- reset()
- focusTile(tile)
- focusStructure(structure)

## Default Camera

The default camera should centre on the Royal City defined by the currently loaded map data.

The default zoom should present the map at the scale where large structures are immediately recognisable without requiring the user to zoom.

Reset View always returns to this default state.

## Camera Behaviour

The camera should support:

- Continuous zoom
- Cursor or finger-centred zoom
- Smooth camera movement
- Immediate stop when panning ends (no momentum)
- Approximately one tile of overscroll beyond the map boundary
- No map rotation

Selection remains independent from camera position and zoom.

The camera is responsible only for determining what part of the map is visible.