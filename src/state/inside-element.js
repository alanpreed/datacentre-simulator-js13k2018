import { setupConnections, generateConnection } from '../connection';
import { Block } from '../block';
import { Effect } from '../effect';
import { packetSpawner } from '../packetSpawner';

export class InsideElement {

  constructor(level) {
    this.level = level;
    this.packets = [];
    this.packetSpawner = new packetSpawner(0.1, kontra.canvas.width, kontra.canvas.height);
    this.effects = [];
    this.connections = setupConnections();
    this.blocks = [];
    this.pointer = kontra.sprite(new Block(kontra.pointer.x, kontra.pointer.y, 50, 5, 0));
    this.pointer.rotationStep = Math.PI / 8;
    this.pointer.color = 'blue';
    this.pointer.update = function () {
      this.x = kontra.pointer.x;
      this.y = kontra.pointer.y;
    };
    kontra.pointer.onDown(() => {
      this.blocks.push(new Block(this.pointer.x,
        this.pointer.y,
        this.pointer.width,
        this.pointer.height,
        this.pointer.rotation,
        50));
    });

    const handleMouseWheel = (e) => {
      if (e.deltaY < 0) {
        this.pointer.rotation -= this.pointer.rotationStep;
      } else if (e.deltaY > 0) {
        this.pointer.rotation += this.pointer.rotationStep;
      }
    };

    document.addEventListener('wheel', handleMouseWheel);

  }

  update() {
    if(this.packetSpawner.checkSpawnPacket()) {
      this.packets.push(this.packetSpawner.generatePacket());
    }

    this.packets.forEach((packet, index) => {
      packet.update();
      const { x, y } = packet.checkBlockCollisions(this.blocks);
      if (x && y) {
        this.effects.push(new Effect(x, y, 1, 15));
      }
      if (packet.lost) {
        this.packets.splice(index, 1);
      }
    });

    this.connections.forEach((connection, index) => {
      connection.update();
      connection.checkCollisions(this.packets);

      if (connection.isLost || connection.isSuccesful) {
        this.connections.splice(index, 1);
        this.connections.push(generateConnection());
      }
    });

    this.blocks.forEach((block, index) => {
      // block.update();

      // if (block.lifetime === 0) {
      //   this.blocks.splice(index, 1);
      // }
    });

    this.effects.forEach((effect, index) => {
      effect.update();

      if (effect.finished) {
        this.effects.splice(index, 1);
      }
    });

    this.pointer.update();

    return 'insideElement';
  }

  render() { /* eslint-disable no-undef*/
    this.packets.forEach(packet => kontra.sprite(packet).render());
    this.connections.forEach(connection => kontra.sprite(connection).render());
    this.connections.forEach(connection => kontra.context.fillText(connection.connectionLife, connection.x, connection.y));
    this.connections.forEach(connection => kontra.context.fillText(connection.requiredPackets, connection.x - 5, connection.y - 5));
    this.blocks.forEach(block => kontra.sprite(block).render());
    this.effects.forEach(effect => kontra.sprite(effect).render());
    this.pointer.render();
  }
}
