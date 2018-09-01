require('kontra');
import { Packet } from './packet';
import { setupConnections } from './connection';
import { Block } from './block';

kontra.init();


let generatePacket = function() {
  const packetWidth = 10;
  return new Packet(Math.random() * kontra.canvas.width, -packetWidth, Math.random() + 0.1, packetWidth, kontra.canvas.width, kontra.canvas.height);
}

let setupPackets = function(numPackets) {
  const packets = [];

  for(var i = 0; i < numPackets; i++) {
    packets[i] = generatePacket();
  }
  return packets;
}

let packets = setupPackets(5);
const connections = setupConnections();
let blocks = [];
let player = kontra.sprite(new Block(kontra.pointer.x, kontra.pointer.y, 30, 5, 0));
player.rotationStep = Math.PI / 8;
player.color = "blue";
player.update = function(){
  this.x = kontra.pointer.x;
  this.y = kontra.pointer.y;
};

// Input handling
kontra.pointer.onDown(function(event, object) {
  blocks.push(new Block(player.x, player.y, player.width, player.height, player.rotation, 60));
});

let handleMouseWheel = (e) => {
  if(e.deltaY < 0) {
    player.rotation -= player.rotationStep;
  }
  else if(e.deltaY > 0) {
    player.rotation += player.rotationStep;
  }
}

document.addEventListener('wheel', handleMouseWheel);

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
    blocks.forEach(block => block.update());
    for(var i = 0; i < blocks.length; i++){
      if(blocks[i].lifetime == 0){
        blocks.splice(i, 1);
      }
    }
    player.update();
  },
  render: function() {
    packets.forEach(packet => kontra.sprite(packet).render());
    connections.forEach(connection => kontra.sprite(connection).render());
    blocks.forEach(block => kontra.sprite(block).render());
    player.render();
  }
});

loop.start();
