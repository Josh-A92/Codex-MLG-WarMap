# Architectural Decisions

This file records major engineering decisions.

---

## ADR-001

The verified Excel blueprint is the single source of truth.

Reason:

Prevents artistic changes moving objectives.

---

## ADR-002

Renderer is data-driven.

Reason:

Allows new maps without changing code.

---

## ADR-003

Sprites are approved assets.

Reason:

Consistency throughout the application.

---

## ADR-004

Small milestones.

Reason:

Reduces bugs and simplifies testing.

---

## ADR-005

Capabilities before polish.

Reason:

Working software is more valuable than visual perfection.

---

## ADR-006

Command Centre is the Season 1 home/front-page workspace.

Reason:

The project is now a season strategy platform, not only a single map viewer.

---

## ADR-007

Season 1 uses one shared verified base map with separate per-server strategic state.

Reason:

Sharing the verified base map preserves accuracy and avoids duplication, while separate per-server state enables independent ownership and strategy tracking.

Server-specific state must remain separated for:

- ownership
- notes
- objectives
- history
- scoring
- last-updated

---

## ADR-008

Server dock placement is bottom-left, just outside the map viewport.

Reason:

This keeps workspace switching close to map interaction without obscuring map content.

---

## ADR-009

Strategic summaries are required in Season 1 workspace direction.

Reason:

Command Centre and server views need quick, consistent strategy context.

Summary set:

- Ice Crystals
- tiles owned
- territory percentage
- captured vs available structures