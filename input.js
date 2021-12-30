import { SNAKE_SPEED } from "./snake.js";

let inputDir = { x: 0, y: 0 };
let lastInputDir = { x: 0, y: 0 };
let timeStamps = [];
let keyPressNumber = 0;

window.addEventListener("keydown", (e) => {
   // only allow inputs as fast as the frame rate
   let time = e.timeStamp / 1000;
   keyPressNumber++;
   timeStamps[keyPressNumber % 2] = time;
   if (Math.abs(timeStamps[0] - timeStamps[1]) < 1 / SNAKE_SPEED) return;
   switch (e.key) {
      case "ArrowUp":
         if (lastInputDir.y !== 0) break;
         inputDir = { x: 0, y: -1 };
         break;
      case "ArrowDown":
         if (lastInputDir.y !== 0) break;
         inputDir = { x: 0, y: 1 };
         break;
      case "ArrowLeft":
         if (lastInputDir.x !== 0) break;
         inputDir = { x: -1, y: 0 };
         break;
      case "ArrowRight":
         if (lastInputDir.x !== 0) break;
         inputDir = { x: 1, y: 0 };
         break;
   }
   lastInputDir = inputDir;
});

export { inputDir };
