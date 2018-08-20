require('kontra');
import { Packet, generatePacket } from './packet';

kontra.init();

let packet = generatePacket();

let loop = kontra.gameLoop({
  update: function() {
    packet.update();
  },
  render: function() {
    packet.render();
  }
});

loop.start();
