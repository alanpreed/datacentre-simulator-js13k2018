/* eslint-disable no-undef */
import { setupPackets, generatePacket } from './packet';
import { setupConnections, generateConnection } from './connection';
import { Block } from './block';

require('kontra');

kontra.init();

const packets = setupPackets(5);
let score = 0;
const connections = setupConnections();
const blocks = [];
const pointer = kontra.sprite(new Block(kontra.pointer.x, kontra.pointer.y, 30, 5, 0));
pointer.rotationStep = Math.PI / 8;
pointer.color = 'blue';
pointer.update = function () {
  this.x = kontra.pointer.x;
  this.y = kontra.pointer.y;
};

// Input handling
kontra.pointer.onDown(() => {
  blocks.push(new Block(pointer.x, pointer.y, pointer.width, pointer.height, pointer.rotation, 200));
});

const handleMouseWheel = (e) => {
  if (e.deltaY < 0) {
    pointer.rotation -= pointer.rotationStep;
  } else if (e.deltaY > 0) {
    pointer.rotation += pointer.rotationStep;
  }
};

document.addEventListener('wheel', handleMouseWheel);

const loop = kontra.gameLoop({
  update() {
    packets.forEach((packet, index) => {
      packet.update();
      packet.checkBlockCollisions(blocks);
      if (packet.lost) {
        packets.splice(index, 1);
        packets.push(generatePacket());
      }
    });

    connections.forEach((connection, index) => {
      connection.update();
      const numOfCollisions = connection.checkCollisions(packets);
      score += numOfCollisions;

      if (connection.isLost) {
        connections.splice(index, 1);
        connections.push(generateConnection());
      }
    });

    blocks.forEach((block, index) => {
      block.update();

      if (block.lifetime === 0) {
        blocks.splice(index, 1);
      }
    });

    pointer.update();
  },
  render() {
    packets.forEach(packet => kontra.sprite(packet).render());
    connections.filter(connection => connection.shouldRender())
      .forEach(connection => kontra.sprite(connection).render());
    connections.forEach(connection => kontra.context.fillText(connection.connectionLife, connection.x, connection.y));
    connections.forEach(connection => kontra.context.fillText(connection.requiredPackets, connection.x - 5, connection.y - 5));
    kontra.context.fillText(`Score: ${score}`, kontra.canvas.width / 2, 10);
    blocks.forEach(block => kontra.sprite(block).render());
    pointer.render();
  },
});

loop.start();


// Proposed APi ( ShouldRender, isLost, update checkCollisions (somehow))
