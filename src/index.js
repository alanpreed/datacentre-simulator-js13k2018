/* eslint-disable no-undef */
require('./lib/kontra');
import { InsideElement } from './state/inside-element';
import { DataCenter } from './state/datacenter';
import { Menu } from './state/menu';

kontra.init();

const background = kontra.sprite({x: 0, y: 0, width: kontra.canvas.width, height: kontra.canvas.height, color: '#012A36'});
let currentGameState = 'menu';
const gameState = {
  menu : null,
  insideElement: null,
  dataCenter: null,
  failed: null,
};
let level = 0;
let time = null;

const loop = kontra.gameLoop({
  update() {

    if(gameState[currentGameState] === null) {
      if(currentGameState === 'insideElement') {
        if(level === 1) {
          time = new Date();
        }
        gameState[currentGameState] = new InsideElement(level);
      } else if (currentGameState === 'dataCenter') {
        gameState[currentGameState] =  new DataCenter(level);
      } else if (currentGameState === 'menu') {
        gameState[currentGameState] = new Menu('main');
      } else if (currentGameState === 'failed') {
        currentGameState = 'menu';
        level = 0;
        const endTime = new Date();
        gameState[currentGameState] = new Menu('failed', time, endTime);
        time=null;
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
  },
  render() {
    background.render();
    if(gameState[currentGameState]) {
      gameState[currentGameState].render();
    }
  },
});

loop.start();
