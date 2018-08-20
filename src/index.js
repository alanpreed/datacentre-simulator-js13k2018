require('kontra');
import { Packet, generatePacket, setupPackets } from './packet';
import { generate } from 'rxjs';

kontra.init();

let packets = setupPackets(5);

let loop = kontra.gameLoop({
  update: function() {
    for(var i = 0; i < packets.length; i++) {
      if(packets[i].lost) {
        packets[i] = generatePacket();
      }
      else {
        packets[i].update();
      }
    }
  },
  render: function() {
    for(var i = 0; i < packets.length; i++) {
      packets[i].render();
    }
  }
});

loop.start();
