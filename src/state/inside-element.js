import { Connection } from '../connection';
import { Block } from '../block';
import { Effect } from '../effect';
import { packetSpawner } from '../packetSpawner';

export class InsideElement {
  constructor(level) {
    this.setupLevel(level);

    this.failed = false;
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
    this.packetSpawners.forEach(packetSpawner => {
      if(packetSpawner.checkSpawnPacket()) {
        this.packets.push(packetSpawner.generatePacket());
      }
    })

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

    let succeededConnections = 0;

    this.connections.forEach((connection, index) => {
      connection.update();
      connection.checkCollisions(this.packets);

      if (connection.failed) {
        this.failed = true;
      }
      if(connection.succeeded) {
        succeededConnections++;
      }
    });

    this.effects.forEach((effect, index) => {
      effect.update();

      if (effect.finished) {
        this.effects.splice(index, 1);
      }
    });

    this.pointer.update();

    if(this.failed) {
      return 'failed';
    }
    else if(succeededConnections === this.connections.length) {
      return 'dataCenter';
    }
    else {
      return 'insideElement';
    }
  }

  render() {
    let objectGroups = [this.packets, this.connections, this.blocks, this.effects];
    objectGroups.forEach(group => group.forEach(object => kontra.sprite(object).render()));
    this.pointer.render();

    this.connections.forEach(connection => kontra.context.fillText(connection.timeSinceLastPacket, connection.x, connection.y));
  }

  setupLevel(level) {
    this.level = level;
    this.packets = [];
    this.packetSpawners = [];
    this.effects = [];
    this.connections = [];
    this.blocks = [];

    let numProblems = 2 * Math.round(level / 2);

    for(var i = 0; i < numProblems; i++) {
      const spawnerSpeed = 1 + (level / 4);
      this.packetSpawners.push(new packetSpawner(0.1, kontra.canvas.width, kontra.canvas.height, spawnerSpeed));
    }

    for(var i = 0; i < numProblems; i++) {
      const connectionWidth = 20;
      const connectionHeight = 20;
      const connectionSuccessWait = 150;
      const connectionFailWait = 500 + (2000 / level);
      this.connections.push(new Connection(Math.random() * (kontra.canvas.width - connectionWidth), Math.random() * (kontra.canvas.height - connectionHeight), connectionHeight, connectionWidth, connectionFailWait, connectionSuccessWait));
    }
  }
}
