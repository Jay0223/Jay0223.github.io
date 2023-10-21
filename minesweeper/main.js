const controls = document.getElementById("controls");
const minefield = document.getElementById("minefield");
const cellsRevealed = new Set();
const cellsFlagged = new Set();
let minefieldSize = 100;
let mineCount = 10;
let gameLost = false;

function initiateGame(size, count) {
  // create cells
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
    newCell.dataset.status = "unrevealed";
    minefield.appendChild(newCell);
  }

  // create random mine locations
  const locations = new Set();
  while (locations.size < count) {
    const newMine = Math.floor(Math.random() * size + 1);
    locations.add(newMine);
  }
  locations.forEach((id) => {
    document.querySelector(`[data-id="${id}"]`).dataset.surroundingMineCount =
      "x";
    // update the surrounding-mine-count for cells around
    const cellsAround = getCellsAround(
      size,
      document.querySelector(`[data-id="${id}"]`)
    );
    cellsAround.forEach((cell) => {
      if (cell.dataset.surroundingMineCount != "x") {
        cell.dataset.surroundingMineCount =
          +cell.dataset.surroundingMineCount + 1;
      }
    });
  });
  return locations;
}

// initiate games and return mine locations (set)
let mineLocations = initiateGame(minefieldSize, mineCount);

// disable right click context menu in minefield
minefield.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  return false;
});

minefield.addEventListener("mouseup", (e) => {
  if (e.target.classList.contains("cell")) {
    if (e.button === 0) {
      revealCells(minefieldSize, e.target);
      // need to check if game already lost by revealing a mine cell
      if (
        gameLost === false &&
        cellsRevealed.size === minefieldSize - mineCount
      ) {
        // win by revealing all non-mine cells
        console.log("WON!!!!!");
      }
    }
    if (e.button === 2) {
      flagCells(e.target);
      if (
        cellsFlagged.size === mineCount &&
        [...cellsFlagged].every((id) => mineLocations.has(id))
      ) {
        // win by flagging all mines
        console.log("WON!!!!!");
      }
    }
  }
});

// using recursion, a function calling itself.
function revealCells(size, cell) {
  // the if condition makes sure recursion won't go infinite
  if (!cellsRevealed.has(cell)) {
    cellsRevealed.add(cell);
    cell.textContent = cell.getAttribute("data-surrounding-mine-count");
    cell.dataset.status = "revealed";
    if (cell.dataset.surroundingMineCount === "x") {
      gameLost = true;
      console.log("game over");
    } else if (+cell.dataset.surroundingMineCount === 0) {
      cell.textContent = "";
      const cellsAround = getCellsAround(size, cell);
      cellsAround.forEach((c) => {
        revealCells(size, c);
      });
    }
  }
}

function flagCells(cell) {
  if (cell.dataset.status === "unrevealed" && cellsFlagged.size < mineCount) {
    cell.dataset.status = "flagged";
    cell.textContent = "🚩";
    cellsFlagged.add(+cell.dataset.id);
  } else if (cell.dataset.status === "flagged") {
    cell.dataset.status = "question";
    cell.textContent = "?";
    cellsFlagged.delete(+cell.dataset.id);
  } else if (cell.dataset.status === "question") {
    cell.dataset.status = "unrevealed";
    cell.textContent = "";
  }
}

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
