const controls = document.getElementById("controls");
const minefield = document.getElementById("minefield");
const cellsRevealed = new Set();
let minefieldSize = 100;

function createCells(size) {
  const minefieldEdgeSize = Math.sqrt(size);
  minefield.style.setProperty(
    "grid",
    `repeat(${minefieldEdgeSize}, 30px) / repeat(${minefieldEdgeSize}, 30px)`
  );
  for (let i = 0; i < size; i++) {
    const newCell = document.createElement("div");
    newCell.classList.add("cell");
    newCell.dataset.id = i + 1;
    newCell.dataset.surroundingMineCount = 0;
    minefield.appendChild(newCell);
  }
}

function placeMines(size, mineCount) {
  const mineLocations = new Set();
  while (mineLocations.size < mineCount) {
    const newMine = Math.floor(Math.random() * size + 1);
    mineLocations.add(newMine);
  }
  const minefieldEdgeSize = Math.sqrt(size);
  mineLocations.forEach((id) => {
    document.querySelector(`[data-id="${id}"]`).dataset.surroundingMineCount =
      "mine";
    // update the surrounding-mine-count for cells around
    const cellsAround = getCellsAround(
      size,
      document.querySelector(`[data-id="${id}"]`)
    );
    cellsAround.forEach((cell) => {
      if (cell.dataset.surroundingMineCount != "mine") {
        cell.dataset.surroundingMineCount =
          +cell.dataset.surroundingMineCount + 1;
      }
    });
  });
}

function fillNumbers() {
  document.querySelectorAll(".cell").forEach((cell) => {
    if (cell.dataset.surroundingMineCount === "mine") {
      cell.textContent = "x";
    } else if (+cell.dataset.surroundingMineCount > 0) {
      cell.textContent = cell.dataset.surroundingMineCount;
    }
  });
}

createCells(minefieldSize);
placeMines(minefieldSize, 10);
fillNumbers();

// disable right click context menu in minefield
minefield.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  return false;
});

minefield.addEventListener("mouseup", (e) => {
  if (e.button === 0) {
    console.log("left");
  }
  if (e.button === 2) {
    console.log("right");
  }
});

function revealCells(cell) {}

function getCellsAround(size, cell) {
  const minefieldEdgeSize = Math.sqrt(size);
  // + convert string to number
  const id = +cell.dataset.id;
  const cellsAround = [];

  // check top-left cell
  if (
    id - minefieldEdgeSize - 1 > 0 &&
    (id - minefieldEdgeSize - 1) % minefieldEdgeSize != 0
  ) {
    cellsAround.push(
      document.querySelector(`[data-id="${id - minefieldEdgeSize - 1}"]`)
    );
  }

  // check top cell
  if (id - minefieldEdgeSize > 0) {
    cellsAround.push(
      document.querySelector(`[data-id="${id - minefieldEdgeSize}"]`)
    );
  }

  // check top-right cell
  if (
    id - minefieldEdgeSize + 1 > 0 &&
    (id - minefieldEdgeSize + 1) % minefieldEdgeSize != 1
  ) {
    cellsAround.push(
      document.querySelector(`[data-id="${id - minefieldEdgeSize + 1}"]`)
    );
  }

  // check left cell
  if ((id - 1) % minefieldEdgeSize != 0) {
    cellsAround.push(document.querySelector(`[data-id="${id - 1}"]`));
  }

  // check right cell
  if ((id + 1) % minefieldEdgeSize != 1) {
    cellsAround.push(document.querySelector(`[data-id="${id + 1}"]`));
  }

  // check bottom-left cell
  if (
    id + minefieldEdgeSize - 1 < size &&
    (id + minefieldEdgeSize - 1) % minefieldEdgeSize != 0
  ) {
    cellsAround.push(
      document.querySelector(`[data-id="${id + minefieldEdgeSize - 1}"]`)
    );
  }

  // check bottom cell
  if (id + minefieldEdgeSize < size + 1) {
    cellsAround.push(
      document.querySelector(`[data-id="${id + minefieldEdgeSize}"]`)
    );
  }

  // check bottom-right cell
  if (
    id + minefieldEdgeSize + 1 < size + 1 &&
    (id + minefieldEdgeSize + 1) % minefieldEdgeSize != 1
  ) {
    cellsAround.push(
      document.querySelector(`[data-id="${id + minefieldEdgeSize + 1}"]`)
    );
  }

  return cellsAround;
}
