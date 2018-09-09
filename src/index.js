/* eslint-disable no-undef */
require('kontra');
import { InsideElement } from './state/inside-element';
import { DataCenter } from './state/datacenter';

kontra.init();

const background = kontra.sprite({x: 0, y: 0, width: kontra.canvas.width, height: kontra.canvas.height, color: 'black'});
let currentGameState = 'insideElement';
const gameState = {
  insideElement: null,
  dataCenter: null
};



const loop = kontra.gameLoop({
  update() {

    if(gameState[currentGameState] === null) {
      if(currentGameState === 'insideElement') {
        gameState[currentGameState] = new InsideElement(1);
      } else if (currentGameState === 'dataCenter') {
        gameState[currentGameState] ===  new DataCenter();
      }
    }

    const newGameState = gameState[currentGameState].update();

    if(newGameState !== currentGameState) {
      gameState[currentGameState] = null;
      currentGameState = newGameState;
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