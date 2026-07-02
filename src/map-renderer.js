const mapDataUrl = "data/season1-map.json";

const spriteByCode = {
  V1: "assets/sprites/village.png",
  C2: "assets/sprites/mine.png",
  MN3: "assets/sprites/manor.png",
  F4: "assets/sprites/factory.png",
  T5: "assets/sprites/town.png",
  MP6: "assets/sprites/metropolis.png",
  RC7: "assets/sprites/royal-city.png"
};

const HEAD_CELL_CLASS = "headcell";
const TILE_CLASS_PREFIX = "tile";
const MARKER_CLASS_PREFIX = "marker sprite-v3";
const DEFAULT_GRID_SIZE = 20;

const map = document.getElementById("map");
const colheads = document.getElementById("colheads");
const colheadsBottom = document.getElementById("colheadsBottom");
const rowheads = document.getElementById("rowheads");
const rowheadsRight = document.getElementById("rowheadsRight");

function createHeadCell(value) {
  const cell = document.createElement("div");
  cell.className = HEAD_CELL_CLASS;
  cell.textContent = value;
  return cell;
}

function appendHeaderCells(targets, value) {
  targets.forEach((target) => {
    target.appendChild(createHeadCell(value));
  });
}

function renderGridHeaders(gridSize) {
  // The row and column headers share the same structure, so a small helper keeps the logic DRY.
  for (let index = 1; index <= gridSize; index += 1) {
    appendHeaderCells([colheads, colheadsBottom], index);
    appendHeaderCells([rowheads, rowheadsRight], index);
  }
}

function createTileElement(tile) {
  const element = document.createElement("div");
  element.className = `${TILE_CLASS_PREFIX} ${tile.code}`;
  element.title = `R${tile.row} C${tile.col} · ${tile.code} · ${tile.type}`;
  element.innerHTML = `<span class="code">${tile.code}</span>`;
  return element;
}

function renderTiles(tiles) {
  tiles.forEach((row) => {
    row.forEach((tile) => {
      map.appendChild(createTileElement(tile));
    });
  });
}

function createMarkerElement(marker) {
  const element = document.createElement("div");
  element.className = `${MARKER_CLASS_PREFIX} ${marker.code}`;
  element.style.setProperty("--r", marker.row);
  element.style.setProperty("--c", marker.col);
  element.style.setProperty("--rows", marker.rows);
  element.style.setProperty("--cols", marker.cols);

  const sprite = spriteByCode[marker.code];
  const content = sprite
    ? `<img class="sprite-img" src="${sprite}" alt="${marker.type}"><span class="sprite-level">${marker.level}</span>`
    : `<span><span class="lvl">${marker.level}</span>${marker.type}</span>`;

  element.innerHTML = content;
  element.title = `${marker.type} · R${marker.row} C${marker.col} · ${marker.rows}x${marker.cols}`;
  return element;
}

function renderMarkers(markers) {
  markers.forEach((marker) => {
    map.appendChild(createMarkerElement(marker));
  });
}

function renderMap(data) {
  const gridSize = Number(data.gridSize || DEFAULT_GRID_SIZE);
  const tiles = data.tiles || [];
  const markers = data.structures || [];

  renderGridHeaders(gridSize);
  renderTiles(tiles);
  renderMarkers(markers);
}

function loadMapData() {
  return fetch(mapDataUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to load map data");
      }
      return response.json();
    });
}

function initializeMap() {
  loadMapData()
    .then((data) => renderMap(data))
    .catch((error) => {
      console.error("Unable to load map data", error);
    });
}

initializeMap();
