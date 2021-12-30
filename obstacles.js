import { onSnake, equalPos } from "./snake.js";
import { getRandomVacantPos } from "./grid.js";
import { food } from "./food.js";

let obstacles = [];
let sound = new Audio("./audio/bomb.mp3");

function update() {
   if (onSnake(food)) {
      obstacles.push(getRandomVacantPos());
   }
}

function draw(gameBoard) {
   for (const obstacle of obstacles) {
      const obstacleElem = document.createElement("div");
      obstacleElem.style.gridRowStart = obstacle.y;
      obstacleElem.style.gridColumnStart = obstacle.x;
      obstacleElem.classList.add("food", "flex-center");
      obstacleElem.innerText = "💣";
      gameBoard.appendChild(obstacleElem);
   }
}

function onObstacle(cell) {
   if (
      obstacles.some((obstacle) => {
         return equalPos(obstacle, cell);
      })
   ) {
      sound.play();
      return true;
   } else return false;
}

export { update, draw, obstacles, onObstacle };
