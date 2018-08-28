require('kontra');
import { generatePacket, setupPackets } from './packet';
import { setupConnections } from './connection';
import {Player } from './player';

kontra.init();

let packets = setupPackets(5);
const connections = setupConnections();
let player = new Player();

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
    connections.forEach(connection => connection.update());
    player.update();
  },
  render: function() {
    packets.forEach(packet => packet.render());
    connections.forEach(connection => kontra.sprite(connection).render());
    player.render();
  }
});

loop.start();
