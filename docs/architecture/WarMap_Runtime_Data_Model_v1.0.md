# WarMap Runtime Data Model v1.0

## Status

Draft runtime architecture.

This document defines the objects that exist **while the application is
running** and the relationships between them. It complements **WarMap
Data Architecture v1.0**, which defines the long-term platform
structure.

------------------------------------------------------------------------

# Runtime Philosophy

The runtime should answer three questions at all times:

1.  Which season is currently loaded?
2.  Which map instance is currently active?
3.  What is the current live state for that map?

The runtime should never modify the shared blueprint.

------------------------------------------------------------------------

# High-Level Runtime

``` text
ApplicationState
│
├── Active Season
│
├── Blueprint Cache
│
├── Map Instance Store
│
├── Union Registry
│
├── Ownership Store
│
├── Dashboard Service
│
├── History Service
│
├── Selection State
│
└── UI State
```

------------------------------------------------------------------------

# Core Runtime Objects

## ApplicationState

The root runtime object.

Responsibilities:

-   active season
-   active map instance
-   loaded blueprints
-   loaded map instances
-   application mode
-   UI state

Only one ApplicationState should exist.

------------------------------------------------------------------------

## Season

Represents the currently loaded season.

Contains references to:

-   rules
-   blueprints
-   participating unions
-   map instances

A season should not contain live ownership.

------------------------------------------------------------------------

## Blueprint

Static world definition.

Contains:

-   geometry
-   terrain
-   structures
-   labels
-   routes

Blueprints are read-only during normal operation.

------------------------------------------------------------------------

## MapInstance

Represents one server/kingdom.

Contains only live information.

Example responsibilities:

-   ownership
-   notes
-   markers
-   objectives
-   calculated production
-   timestamps

Changing Map A must never affect Map B.

------------------------------------------------------------------------

## OwnershipStore

Stores ownership records for every loaded map instance.

Key concept:

``` text
MapInstance
    +
Entity
    =
Ownership
```

The blueprint never owns territory.

------------------------------------------------------------------------

## UnionRegistry

Provides lookup information for unions.

Responsibilities:

-   colours
-   names
-   identifiers
-   participation

------------------------------------------------------------------------

## SelectionState

Represents what the user currently has selected.

Contains:

-   selected entity
-   selected map
-   selection mode

Selection must clear when switching maps.

------------------------------------------------------------------------

## DashboardService

Produces summaries.

It calculates:

-   territories owned
-   structures owned
-   production
-   scores
-   recent activity

It never stores authoritative ownership.

------------------------------------------------------------------------

## HistoryService

Records every mutation.

Used for:

-   undo
-   auditing
-   future timelines
-   collaboration

------------------------------------------------------------------------

## UIState

Stores presentation only.

Examples:

-   zoom
-   pan
-   active tab
-   open panels
-   filters

Changing UIState must never change map data.

------------------------------------------------------------------------

# Runtime Relationships

``` text
ApplicationState
│
├── Season
│
├── Blueprint
│
├── MapInstances
│      ├── Ownership
│      ├── Notes
│      └── Objectives
│
├── UnionRegistry
│
├── DashboardService
│
└── HistoryService
```

------------------------------------------------------------------------

# Runtime Rules

1.  Blueprints are immutable during play.
2.  Every ownership record belongs to exactly one map instance.
3.  Dashboard values are calculated, not duplicated.
4.  UI state is independent of map state.
5.  History records every mutation.
6.  Switching maps changes only the active MapInstance.

------------------------------------------------------------------------

# Immediate Refactor Targets

The current application should evolve toward:

1.  ApplicationState manages active map instance.
2.  Shared blueprint loaded once.
3.  Separate ownership store for each map.
4.  Command Centre aggregates across map instances.
5.  Renderer reads blueprint + active ownership.
6.  Map switching replaces runtime state cleanly.

------------------------------------------------------------------------

# Future Expansion

This runtime model supports:

-   additional seasons
-   different map geometries
-   collaborative editing
-   database persistence
-   web deployment
-   mobile clients
-   AI-assisted planning

without changing the fundamental object model.
