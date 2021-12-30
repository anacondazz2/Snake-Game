import { addPoints } from "./game.js";
import { onSnake, expandSnake } from "./snake.js";
import { getRandomVacantPos } from "./grid.js";

const EXPANSION_RATE = 1;
let food = {}; // init. food so getRandomVacantPos can read it, food = getRandomVacantPos() doesn't work
food = getRandomVacantPos();
const sound = new Audio("./audio/bubble-blip.mp3"); sound.volume = 0.5;

function update() {
   if (onSnake(food)) {
      expandSnake(EXPANSION_RATE);
      food = getRandomVacantPos();
      addPoints();
      sound.play();
   }
}

function draw(gameBoard) {
   const foodElem = document.createElement("div");
   foodElem.style.gridRowStart = food.y;
   foodElem.style.gridColumnStart = food.x;
   foodElem.classList.add("food", "flex-center");
   foodElem.innerText = "🍉";
   gameBoard.appendChild(foodElem);
}

export { update, draw, food };
