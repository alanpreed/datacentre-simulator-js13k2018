require('kontra');
import { Packet } from './packet';

kontra.init();

let packet = new Packet(10, 10, 1);

let loop = kontra.gameLoop({  // create the main game loop
  update: function() {        // update the game state
    packet.update();
  },
  render: function() {        // render the game state
    packet.render();
  }
});

function generatePackets() {
  return Array(10).fill(new Packet(Math.random(10), Math.random(10)));
}

loop.start();    // start the game
