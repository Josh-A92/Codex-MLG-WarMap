# Testing Checklist

Every milestone must pass these checks before committing.

## Renderer

☐ Map loads.

☐ JSON loads.

☐ No console errors.

☐ Correct number of tiles.

☐ Structures in correct positions.

☐ Frost Mines present.

☐ Sprites load.

☐ Verified Season 1 base map remains unchanged.

---

## Visual

☐ Ice Mist colours.

☐ Correct spacing.

☐ Responsive layout.

☐ Server dock remains bottom-left and outside map viewport.

☐ Active workspace/server state is visually clear.

☐ Strategic summary blocks are readable.

☐ Command Centre card spacing/hierarchy remains readable at common desktop sizes.

☐ Server dock active workspace/server state is immediately obvious.

☐ Server dock does not cover map content at desktop sizes.

---

## Workspaces

☐ Command Centre loads as Season 1 home/front page.

☐ Eight Season 1 server/map workspaces are available.

☐ Server dock is generated from Season 1 server data.

☐ Dashboard cards are generated from Season 1 server data.

☐ Command Centre is the default workspace on app load.

☐ Clicking each server dock button opens the existing map workspace.

☐ Clicking Command Centre returns to dashboard view and hides the map cleanly.

☐ Existing camera controls still work after workspace switching.

☐ Existing tile selection still works after workspace switching.

☐ Dashboard renders one calculated summary card per server.

☐ Each dashboard card shows calculated tiles owned, territory percentage, and captured vs available structures.

☐ Ice Crystal summary shows "Scoring rules not configured" unless verified scoring rules exist.

☐ Clicking a dashboard card opens the correct server map workspace.

☐ Clicking Open Map on a dashboard card opens the correct server map workspace.

☐ Server dock active state updates correctly after dashboard navigation.

☐ All server workspaces use the shared verified Season 1 base map.

☐ Server-specific ownership, notes, objectives, history, scoring, and last-updated data remain separated per server.

☐ Workspace switching does not change map positions, structure footprints, or sprite placement.

☐ Shared season1-map.json blueprint remains single-source and is not duplicated per server.

---

## Strategic Summaries

☐ Ice Crystals summary is present.

☐ Tiles owned summary is present.

☐ Territory percentage summary is present.

☐ Captured vs available structures summary is present.

☐ Strategic summary values refresh correctly after switching server context.

☐ Command Centre and server dock layout stays readable on smaller windows.

---

## Documentation

☐ CHANGELOG updated.

☐ README updated if required.

☐ PROJECT_CONTEXT updated if workflow changed.

---

## Git

☐ Commit created.

☐ Push successful.

---

## Milestone Discipline

☐ Scope remains one logical milestone per iteration.