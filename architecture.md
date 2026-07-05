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