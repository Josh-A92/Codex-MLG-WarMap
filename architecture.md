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
            map-renderer.js
                      │
        ┌─────────────┴─────────────┐
        ▼                           ▼
season1-map.json              Sprite Library
        │                           │
        └─────────────┬─────────────┘
                      ▼
                 Rendered Map

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
- Future ownership
- Future history

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

Ownership

History

Analytics

Reporting

Each module should have a clearly defined responsibility.

---

# Design Philosophy

The renderer should be capable of rendering ANY correctly formatted map.

It should not know anything about Season 1 specifically.