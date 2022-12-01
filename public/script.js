import Grid from "./Grid.js"
import Tile from "./Tile.js";

const gameBoard = document.getElementById("game-board")
const scoreElem = document.querySelector("[data-score]")
const scoreAmountElem = document.querySelector("[data-score-amount]")
const currentGame = { score: 0, tiles: [], date: new Date() };
const grid = new Grid(gameBoard);

grid.randomEmptyCell().tile = new Tile(gameBoard);
grid.randomEmptyCell().tile = new Tile(gameBoard);
setupInput();

function setupInput() {
  window.addEventListener("keydown", handleInput, { once: true });
}

async function handleInput(e) {
  let additionalScore;
  switch(e.key) {
    case "ArrowUp":
      if (!canMoveUp()) {
        setupInput();
        return;
      }
      additionalScore = await moveUp();
      break;
    case "ArrowDown":
      if (!canMoveDown()) {
        setupInput();
        return;
      }
      additionalScore = await moveDown();
      break;
    case "ArrowLeft":
      if (!canMoveLeft()) {
        setupInput();
        return;
      }
      additionalScore = await moveLeft();
      break;
    case "ArrowRight":
      if (!canMoveRight()) {
        setupInput();
        return;
      }
      additionalScore = await moveRight();
      break;
    default:
      setupInput();
      return;
  }
  if (additionalScore && additionalScore > 0) {
    currentGame.score += additionalScore;
    showScore(additionalScore);
  }
  grid.cells.forEach(cell => cell.mergeTiles());
  const newTile = new Tile(gameBoard);
  grid.randomEmptyCell().tile = newTile;

  if (!canMoveUp() && !canMoveDown() && !canMoveLeft() && !canMoveRight()) {
    newTile.waitForTransition(true).then(() => {
      alert("Game Over")
    });
    return;
  }

  saveCurrentState();
  setupInput();
}

function saveCurrentState() {
  currentGame.tiles = grid.cells
    .filter(cell => cell.tile != null)
    .map(cell => {
      return { x: cell.x, y: cell.y, value: cell.tile.value }
    })
  currentGame.highestTile = Math.max(
    ...grid.cells.map(cell => cell.tile?.value || 0)
  )
}

async function showScore(additionalScore) {
  scoreAmountElem.textContent = currentGame.score;
  if (additionalScore != null) {
    const additionalScoreElem = document.createElement("div")
    additionalScoreElem.classList.add("additional-score")
    additionalScoreElem.textContent = `+${additionalScore}`
    const startX = Math.random() * 100
    const startY = Math.random() * 100
    additionalScoreElem.style.setProperty("--start-x", `${startX}%`)
    additionalScoreElem.style.setProperty("--start-y", `${startY}%`)
    additionalScoreElem.style.setProperty(
      "--end-x",
      `${startX + (Math.random() < 0.5 ? 1 : -1) * (Math.random() * 50 + 50)}%`
    )
    additionalScoreElem.style.setProperty(
      "--end-y",
      `${startY + Math.random() * 50 + 50}%`
    )
    scoreElem.appendChild(additionalScoreElem);
    await new Promise((resolve) => {
      additionalScoreElem.addEventListener("animationend", resolve, { once: true });
    })
    additionalScoreElem.remove();
  }
}

function moveUp() {
  return slideTiles(grid.cellsByColumn);
}

function moveDown() {
  return slideTiles(grid.cellsByColumn.map(column => [...column].reverse()));
}

function moveLeft() {
  return slideTiles(grid.cellsByRow);
}

function moveRight() {
  return slideTiles(grid.cellsByRow.map(row => [...row].reverse()));
}

async function slideTiles(cells) {
  await Promise.all(
    cells.flatMap((group) => {
      const promises = [];
      for (let i = 1; i < group.length; i++) {
        const cell = group[i];
        let lastValidCell;
        if (cell.tile == null) continue;
        for (let j = i - 1; j >= 0; j--) {
          const moveToCell = group[j];
          if (!moveToCell.canAccept(cell.tile)) break;
          lastValidCell = moveToCell;
        }
        if (lastValidCell != null) {
          promises.push(cell.tile.waitForTransition());
          if (lastValidCell.tile != null) {
            lastValidCell.mergeTile = cell.tile;
          } else {
            lastValidCell.tile = cell.tile;
          }
          cell.tile = null;
        }
      }
      return promises;
    })
  )
  const additionalScore = grid.cells.reduce((sum, cell) => {
    if (cell.mergeTile == null || cell.tile == null) return sum
    return sum + cell.mergeTile.value + cell.tile.value
  }, 0)
  return additionalScore
}

function canMoveUp() {
  return canMove(grid.cellsByColumn);
}

function canMoveDown() {
  return canMove(grid.cellsByColumn.map(group => [...group].reverse()));
}

function canMoveLeft() {
  return canMove(grid.cellsByRow);
}

function canMoveRight() {
  return canMove(grid.cellsByRow.map(group => [...group].reverse()));
}

function canMove(cells) {
  return cells.some((group) => {
    return group.some((cell, index) => {
      if (index === 0) return false;
      if (cell.tile == null) return false;
      const moveToCell = group[index - 1];
      return moveToCell.canAccept(cell.tile);
    })
  })
}