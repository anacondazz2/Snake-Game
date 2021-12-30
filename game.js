import {
   update as updateSnake,
   draw as drawSnake,
   SNAKE_SPEED,
   getSnakeHead,
   selfCollide,
} from "./snake.js";
import { update as updateFood, draw as drawFood } from "./food.js";
import {
   update as updateObstacles,
   draw as drawObstacles,
   onObstacle
} from "./obstacles.js";
import { onGrid } from "./grid.js";

const gameBoard = document.querySelector(".game-board");
const scoreElem = document.querySelector(".score");
const highscoreElem = document.querySelector(".highscore");
let lastRenderTime = 0,
   secondsSinceLastRender;
let gameOver = false;
let score = 0;
let highscore = window.localStorage.highscore;

const main = (currentTime) => {
   if (gameOver) {
      if (
         // prettier-ignore
         confirm(
            `You scored ${score} ${score == 1 ? "point" : "points"}!${score > highscore ? "\nYou beat your highscore! 👍" : ""} Press OK or F5 to restart.`
         )
      ) {
         window.location = "/";
      }
      window.localStorage.setItem("highscore", Math.max(highscore, score));
      return;
   }
   window.requestAnimationFrame(main);
   secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
   if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;
   lastRenderTime = currentTime;
   update();
   draw();
};
window.requestAnimationFrame(main);

function update() {
   updateSnake();
   updateObstacles(); // must be called before updateFood() because updateFood() changes the pos of food
   updateFood();
   checkDeath();
   updateScore();
   updateHighscore();
}

function draw() {
   gameBoard.innerHTML = "";
   drawSnake(gameBoard);
   drawFood(gameBoard);
   drawObstacles(gameBoard);
}

function checkDeath() {
   gameOver = !onGrid(getSnakeHead()) || selfCollide() || onObstacle(getSnakeHead());
}

function addPoints() {
   score++;
}

function updateScore() {
   scoreElem.innerText = "Score: " + score;
}

function updateHighscore() {
   highscoreElem.innerText = "Highscore: " + highscore;
}

export { addPoints, gameBoard };
