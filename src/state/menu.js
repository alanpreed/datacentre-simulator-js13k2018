import { Packet } from '../packet';
import { Connection } from '../connection';
import { Block } from '../block';
import { packetSpawner } from '../packetSpawner';

export class Menu {
  constructor(startScreen, startTime, endTime) {
    this.currentScreen = startScreen;
    this.isIntroScreen = false;
    this.isInitialScreen = true;
    this.newGameState = 'menu';
    this.canRenderLogoSprite = false;
    this.startTime = startTime;
    this.endTime = endTime;

    this.blocks = [new Block(kontra.canvas.width/2, kontra.canvas.height/2, 50, 5,Math.PI/2)];
    this.packets = [];
    this.packetSpawners = [
      new packetSpawner(0.05, kontra.canvas.width, kontra.canvas.height, 2),
      new packetSpawner(0.05, kontra.canvas.width, kontra.canvas.height, 2),];
    this.packetSpawners[0].x = -this.packetSpawners[0].packetWidth;
    this.packetSpawners[1].x = this.packetSpawners[1].canvasWidth + this.packetSpawners[1].packetWidth;
    this.packetSpawners[0].y = this.packetSpawners[0].canvasHeight / 3.5;
    this.packetSpawners[1].y = this.packetSpawners[1].canvasHeight / 3.5;
    this.packetSpawners[0].rotation = Math.PI / 8;
    this.packetSpawners[1].rotation = 7 * Math.PI/8;

    kontra.pointer.onDown(() => {
      if(kontra.pointer.over({
        x: kontra.canvas.width/2,
        y: kontra.canvas.height - 50,
        height: 20,
        width: 200
      })); {
        if(this.currentScreen === 'info'){
          this.newGameState = 'dataCenter';
        } else if (this.currentScreen === 'failed'){
          this.currentScreen = 'main';
        } else  {
          this.currentScreen = 'info';
        }
      }
    });

    let logoImage = new Image();
    logoImage.src = 'assets/images/logo.png';
    this.logoSprite = kontra.sprite({
      x: kontra.canvas.width/4,
      y: 20,
      width: 200,
      image: logoImage
    });

    logoImage.onload = () => {
      this.canRenderLogoSprite = true;
    };
  }

  update() {
    if(this.currentScreen === 'main') {
      this.packetSpawners.forEach(packetSpawner => {
        if(packetSpawner.checkSpawnPacket()) {
          this.packets.push(packetSpawner.generatePacket());
        }
      });
  
      this.packets.forEach((packet, index) => {
        packet.update();
        packet.checkBlockCollisions(this.blocks);
        if (packet.lost) {
          this.packets.splice(index, 1);
        }
      });
    }
    return this.newGameState;
  }

  render() {
    // Render title
    // Render menu Items
    const context = kontra.context;
    context.fillStyle = '#E5DADA';
    context.textAlign ='center';

    if(this.currentScreen === 'info') {
      //  render help text
      //  render sprites;
      context.font = '14px Helvetica';
      context.fillText('You work in one of Peruvian Web Services\' datacentres.', kontra.canvas.width/2, 20);
      context.fillText('The equipment is old, faulty and regularly needs manual intervention.', kontra.canvas.width/2, 40);
      context.fillText('When a region goes down your job is to make sure packets:', kontra.canvas.width/2, 70);
      const packet = new Packet(kontra.canvas.width/2, 85, 'red', 0, 10);
      kontra.sprite(packet).render();
      context.fillStyle = '#E5DADA';
      context.fillText('are delivered to connections: ', kontra.canvas.width/2, 110);
      const connection = new Connection(kontra.canvas.width/2 - 10, 120, 20,20, 100);
      kontra.sprite(connection).render();
      context.fillStyle = '#E5DADA';
      context.fillText('by placing patch cables: ', kontra.canvas.width/2, 165);
      const block = new Block(kontra.canvas.width/2, 180, 40, 5, 0, 50);
      kontra.sprite(block).render();
      context.fillText('before the datacentre goes offline.', kontra.canvas.width/2, 205);
      context.fillText('Use your mouse to rotate and place patch cables,', kontra.canvas.width/2, 350);
      context.fillText('to direct packets into connections before they time out.', kontra.canvas.width/2, 370);

      context.font = '30px Helvetica';
      context.fillStyle = '#E5DADA';
      context.fillText('Start Game', kontra.canvas.width/2, kontra.canvas.height - 50);

    }else if (this.currentScreen === 'failed') {
      context.font = '14px Helvetica';
      context.fillText('You failed! Peruvian Web Services is in ruins.', kontra.canvas.width/2, 20);
      context.fillText(`You lasted ${(this.endTime.getTime() - this.startTime.getTime()) / 1000}s before going offline`, kontra.canvas.width/2, 40);
      context.font = '30px Helvetica';
      context.fillStyle = '#E5DADA';
      context.fillText('Main Menu', kontra.canvas.width/2, kontra.canvas.height - 50);
    } else {
      this.blocks.forEach(block => kontra.sprite(block).render());
      this.packets.forEach(packet => kontra.sprite(packet).render());
      if(this.canRenderLogoSprite) {
        this.logoSprite.render();
      }
      context.font = '40px Helvetica';
      context.fillText('Play', kontra.canvas.width/2, kontra.canvas.height - 50);
    }
  }
}
