require('kontra');
import { Packet, generatePacket, setupPackets } from './packet';
import { generate } from 'rxjs';

kontra.init();

let packets = setupPackets(5);

let loop = kontra.gameLoop({
  update: function() {
    packets.forEach((packet, index) => {
      if(packet.lost) {
        // this is a bit funky
        packets[index] = generatePacket();
      }
      else {
        packet.update();
      }
    })
  },
  render: function() {
    packets.forEach(packet => packet.render());
  }
});

loop.start();
