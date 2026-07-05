## v0.1.0
- Created project structure
- Added README
- Added AI development rules
## v0.1.1
- Verified Excel blueprint
- Finalised Ice Mist terrain palette
- Approved Sprite Pack v3 assets
- Created project documentation
## v0.1.2
- Refactored project structure
- Extracted CSS into src/styles.css
- Extracted renderer into src/map-renderer.js
- Reduced index.html to application shell
- Preserved existing functionality
## v0.2.0
- Moved embedded map data into data/season1-map.json
- Updated renderer to load map data from JSON
- Preserved existing map layout and visuals
## v0.2.1
- Added a tile selection engine that stores the clicked tile object in application state
- Added a visible single-tile highlight that moves when a different tile is clicked
## v0.2.2
- Added a selection information panel that shows tile details when a tile is selected
- Added an empty-state message for when no tile is selected
## v0.2.3
- Added a subtle hover highlight for map tiles without changing the selected tile behaviour
## v0.2.4
- Completed Phase 1 Interactive Map milestones for selection, selection details, and hover feedback
- Verified the map remains data-driven and continues to render 400 tiles with 80 marker structures
## v0.2.5
- Fixed marker interaction so sprites no longer block tile hover or selection across the full tile area
## v0.2.6
- Fixed structure selection so multi-tile markers such as Town, Metropolis, and Royal City highlight their full footprint
## v0.2.7
- Refined multi-tile selection styling so structure footprints display as one unified selection outline rather than separate tile borders
## v0.2.8
- Refined passive multi-tile structure background styling so large footprints read as one merged area while preserving the existing 20x20 grid, data model, and selection behavior
## v0.2.9
- Refined large structure footprints to appear as one user-facing tile by hiding internal seams and labels, showing one unified background and border, and preserving hover and selection behavior
## v0.2.10
- Fixed large-structure hover so only the unified footprint overlay shows hover and selection feedback, while internal footprint tiles no longer display individual tile highlights
## v0.2.11
- Updated project documentation to reflect the completed Phase 1 Interactive Map work and the upcoming Phase 2 Camera milestone
- Added the camera design note in docs/CAMERA.md covering input-independent, device-neutral camera behaviour and the 20x20 internal-grid visual model