require('kontra');
import { generatePacket, setupPackets } from './packet';
import { setupConnections } from './connection';
import { Block } from './block';

kontra.init();

let packets = setupPackets(5);
const connections = setupConnections();
let blocks = [];
let player = kontra.sprite({
  x: kontra.pointer.x,
  y: kontra.pointer.y,
  width: 30,
  height: 5,
  rotation: 0,
  rotationStep: Math.PI / 8,
  color: "blue",
  onDown: function() {
    this.blocks.push(new Block(this.x, this.y, this.width, this.height, this.rotation, 60));
  },
  update: function(){
    this.x = kontra.pointer.x;
    this.y = kontra.pointer.y;
  },
  render: function(){
    this.context.save();
    this.context.translate(this.x, this.y);
    this.context.rotate(this.rotation);
    this.context.fillStyle = this.color;
    this.context.fillRect(0, 0, this.width, this.height);
    this.context.restore();
  },
});

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
    packets.forEach(packet => packet.render());
    connections.forEach(connection => kontra.sprite(connection).render());
    blocks.forEach(block => kontra.sprite(block).render());
    player.render();
  }
});

loop.start();
