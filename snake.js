import { inputDir } from "./input.js";

const SNAKE_SPEED = 7;
const snakeBody = [{ x: 10, y: 10 }];
let newSegments = 0;

function update() {
   addSegments();
   for (let i = snakeBody.length - 2; i >= 0; i--) {
      snakeBody[i + 1] = { ...snakeBody[i] };
   }
   snakeBody[0].x += inputDir.x;
   snakeBody[0].y += inputDir.y;
}

function draw(gameBoard) {
   snakeBody.forEach((segment) => {
      const snakeElement = document.createElement("div");
      snakeElement.style.gridRowStart = segment.y;
      snakeElement.style.gridColumnStart = segment.x;
      snakeElement.classList.add("snake");
      gameBoard.appendChild(snakeElement);
   });
}

function expandSnake(amount) {
   newSegments += amount;
};

function onSnake(cell, ignoreHead = false) {
   return snakeBody.some((segment, index) => {
      if (ignoreHead && index === 0) return false;
      return equalPos(segment, cell);
   });
};

function getSnakeHead() {
   return snakeBody[0];
};

function selfCollide() {
   return onSnake(snakeBody[0], true);
};

function equalPos(pos1, pos2) {
   return pos1.x === pos2.x && pos1.y === pos2.y;
};

function addSegments() {
   for (let i = 0; i < newSegments; i++) {
      snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
   }
   newSegments = 0;
};

export {
   SNAKE_SPEED,
   update,
   draw,
   expandSnake,
   onSnake,
   getSnakeHead,
   selfCollide,
   equalPos
};