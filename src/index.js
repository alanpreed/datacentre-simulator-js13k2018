require('kontra');
import { generatePacket, setupPackets } from './packet';
import { setupConnections } from './connection';

kontra.init();

let packets = setupPackets(5);
const connections = setupConnections();
const connectionSprites = connections.map(connection => kontra.sprite(connection));

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
    connectionSprites.forEach(connection => connection.render());
  }
});

loop.start();
