import { Packet } from '../packet';
import { Connection } from '../connection';
import { Block } from '../block';

export class Menu {
  constructor(startScreen, startTime, endTime) {
    this.currentScreen = startScreen;
    this.isIntroScreen = false;
    this.isInitialScreen = true;
    this.newGameState = 'menu';
    this.canRenderLogoSprite = false;
    this.startTime = startTime;
    this.endTime = endTime;

    kontra.pointer.onDown(() => {
      if(kontra.pointer.over({
        x: kontra.canvas.width/2,
        y: kontra.canvas.height - 50,
        height: 20,
        width: 200
      })); {
        switch(this.currentScreen) {
        case 'info':
          this.newGameState = 'dataCenter';
          break;
        case 'failed':
          this.currentScreen = 'main';
          break;
        default:
          // Main menu is default
          this.currentScreen = 'info';
        }
      }
    });

    let logoImage = new Image();
    logoImage.src = 'assets/images/logo.png';
    this.logoSprite = kontra.sprite({
      x: -1,
      y: 20,
      width: 100,
      image: logoImage
    });

    logoImage.onload = () => {
      this.canRenderLogoSprite = true;
    };
  }

  update() {
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
      context.fillText('You work in one of Peruvian Web Services datacentres', kontra.canvas.width/2, 20);
      context.fillText('the equipment is old, faulty and regularly needs interventions.', kontra.canvas.width/2, 40);
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

      context.fillText('Use your mouse to rotate and place patch cables', kontra.canvas.width/2, 350);
      context.fillText('to direct packets into connections before they fail.', kontra.canvas.width/2, 370);


      context.font = '30px Helvetica';
      context.fillStyle = '#E5DADA';
      context.fillText('Start Game', kontra.canvas.width/2, kontra.canvas.height - 50);

    }else if (this.currentScreen === 'failed') {
      context.font = '14px Helvetica';
      context.fillText('You failed! Peruvian Web Services is in ruins.', kontra.canvas.width/2, 20);
      context.fillText(`Time before offline: ${(this.endDate.getTime() - this.startDate.getTime()) / 1000}s`, kontra.canvas.width/2, 40);
      context.font = '30px Helvetica';
      context.fillStyle = '#E5DADA';
      context.fillText('Main Menu', kontra.canvas.width/2, kontra.canvas.height - 50);
    } else {
      if(this.canRenderLogoSprite) {
        this.logoSprite.render();
      }
      context.font = '40px Helvetica';
      context.fillText('Play', kontra.canvas.width/2, kontra.canvas.height - 50);

    }
  }
}
