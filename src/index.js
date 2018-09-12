/* eslint-disable no-undef */
require('kontra');
import { InsideElement } from './state/inside-element';
import { DataCenter } from './state/datacenter';
import { Menu } from './state/menu';

kontra.init();

const background = kontra.sprite({x: 0, y: 0, width: kontra.canvas.width, height: kontra.canvas.height, color: 'black'});
let currentGameState = 'menu';
const gameState = {
  menu : null,
  insideElement: null,
  dataCenter: null,
  failed: null,
};
let level = 0;
let time = 0;

const loop = kontra.gameLoop({
  update() {

    if(gameState[currentGameState] === null) {
      if(currentGameState === 'insideElement') {
        gameState[currentGameState] = new InsideElement(level);
      } else if (currentGameState === 'dataCenter') {
        gameState[currentGameState] =  new DataCenter(level);
      } else if (currentGameState === 'menu') {
        gameState[currentGameState] = new Menu();
      } else if (currentGameState === 'failed') {
        currentGameState = 'menu';
        level = 0;
        gameState[currentGameState] = new Menu('failed');
      }
    }

    const newGameState = gameState[currentGameState].update();

    if(newGameState !== currentGameState) {
      gameState[currentGameState] = null;
      currentGameState = newGameState;
      if(newGameState === 'dataCenter') {
        level++;
      }
    }
    time++;
  },
  render() {
    background.render();
    if(gameState[currentGameState]) {
      gameState[currentGameState].render();
    }
  },
});

loop.start();
