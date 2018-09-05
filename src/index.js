/* eslint-disable no-undef */
import { setupPackets, generatePacket } from './packet';
import { setupConnections, generateConnection } from './connection';
import { Block } from './block';
import { Effect } from './effect';

require('kontra');

kontra.init();

const background = kontra.sprite({x: 0, y: 0, width: kontra.canvas.width, height: kontra.canvas.height, color: 'black'});
const packets = setupPackets(5);
const effects = [];
let score = 0;
const connections = setupConnections();
const blocks = [];
const pointer = kontra.sprite(new Block(kontra.pointer.x, kontra.pointer.y, 50, 5, 0));
pointer.rotationStep = Math.PI / 8;
pointer.color = 'blue';
pointer.update = function () {
  this.x = kontra.pointer.x;
  this.y = kontra.pointer.y;
};

// Input handling
kontra.pointer.onDown(() => {
  blocks.push(new Block(pointer.x, pointer.y, pointer.width, pointer.height, pointer.rotation, 50));
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
      const {x, y} = packet.checkBlockCollisions(blocks);
      if(x && y) {
        effects.push(new Effect(x, y, 1, 15));
      }
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

    effects.forEach((effect, index) => {
      effect.update();

      if (effect.finished) {
        effects.splice(index, 1);
      }
    });

    pointer.update();
  },
  render() {
    background.render();

    packets.forEach(packet => kontra.sprite(packet).render());
    connections.filter(connection => connection.shouldRender())
      .forEach(connection => kontra.sprite(connection).render());
    connections.forEach(connection => kontra.context.fillText(connection.connectionLife, connection.x, connection.y));
    connections.forEach(connection => kontra.context.fillText(connection.requiredPackets, connection.x - 5, connection.y - 5));
    kontra.context.fillText(`Score: ${score}`, kontra.canvas.width / 2, 10);
    blocks.forEach(block => kontra.sprite(block).render());
    effects.forEach(effect => kontra.sprite(effect).render());
    pointer.render();
  },
});

loop.start();


// Proposed APi ( ShouldRender, isLost, update checkCollisions (somehow))
