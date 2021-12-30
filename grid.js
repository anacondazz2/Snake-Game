import { onSnake } from "./snake.js";
import { obstacles } from "./obstacles.js";
import { food } from "./food.js";

const GRID_SIZE = 18;

function getRandomGridPos() {
   return {
      x: Math.floor(Math.random() * GRID_SIZE) + 1,
      y: Math.floor(Math.random() * GRID_SIZE) + 1,
   };
}

function isVacant(cell) {
   if (onSnake(cell)) return false;
   for (const obstacle of obstacles) {
      if (cell.x == obstacle.x || cell.y == obstacle.y) return false;
   }
   if (cell.x == food.x || cell.y == food.y) return false;
   return true;
}

function getRandomVacantPos() {
   let newPos;
   while (newPos == null || !isVacant(newPos)) {
      newPos = getRandomGridPos();
   }
   return newPos;
}

function onGrid(pos) {
   return pos.x >= 1 && pos.x <= GRID_SIZE && pos.y >= 1 && pos.y <= GRID_SIZE;
}

export { getRandomGridPos, getRandomVacantPos, onGrid };
