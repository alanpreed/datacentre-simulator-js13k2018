import { Packet } from "../packet";
import { Connection } from "../connection";

export class Menu {
  constructor() {
    this.isIntroScreen = true;
  }

  update() {


    return 'menu';
  }

  render() {
    // Render title
    // Render menu Items
    const context = kontra.context;
    context.font = '14px Helvetica';
    context.fillStyle = 'white';
    context.textAlign ='center';

    if(this.isInitialScreen) {
      // Render tile
      // render play
    } else if( this.isIntroScreen) {
      //  render help text
      //  render sprites;
      context.fillText('You work in one of Peruvian Web Services datacentres', kontra.canvas.width/2, 20);
      context.fillText('the equipment is old, faulty and regularly needs interventions.', kontra.canvas.width/2, 40);
      context.fillText('When a region goes down your job is to make sure packets:', kontra.canvas.width/2, 70);
      const packet = new Packet(kontra.canvas.width/2, 85, 'red', 0, 10);
      kontra.sprite(packet).render();
      context.fillStyle = 'white';
      context.fillText('are delivered to connections: ', kontra.canvas.width/2, 110);
      const connection = new Connection(kontra.canvas.width/2 - 10, 125, 20,20, 100);
      kontra.sprite(connection).render();
    }
  }
}
