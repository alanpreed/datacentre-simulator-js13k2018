import { DataCenterElement } from '../datacenter-element';

export class DataCenter {
  constructor() {
    const startX = (kontra.canvas.width - 350) /2;
    const size = 50;
    this.shouldChangeGameState = false;

    const failingElement = Math.random() * 5;
    this.dataCenterElements = [
      new DataCenterElement(startX + size, 50, size, size, true, 600),
      new DataCenterElement(startX + size, 180, size, size, false),
      new DataCenterElement(startX + 100 + size, size, size, size, false),
      new DataCenterElement(startX + 200 + size, 50, size, size, false),
      new DataCenterElement(startX + 200 + size, 180, 50, 50, false)];

    kontra.pointer.onDown(() => {
      if(this.failedElement) {
        if(kontra.pointer.over(kontra.sprite(this.failedElement))); {
          this.shouldChangeGameState = true;
        }
      }
    });
  }

  update() {
    this.dataCenterElements.forEach(element => element.update());
    this.failedElement = this.dataCenterElements.find(element => element.isFailed);
    if(this.failedElement) {
      setTimeout(() => { // Allow time for failure animation
        this.shouldChangeGameState = true;
      }, 5000);
    }

    return this.shouldChangeGameState ? 'insideElement' : 'dataCenter';
  }

  render() {
    // Render status text
    const context = kontra.context;
    context.font = '20px Arial';
    context.fillStyle = 'white';
    context.textAlign ='center';
    context.fillText('System status:', kontra.canvas.width/2, 20);
    if(this.failedElement) {
      context.fillStyle='red';
      context.fillText('ERROR', kontra.canvas.width/2 + 85, 20);
    } else {
      context.fillStyle='green';
      context.fillText('OK', kontra.canvas.width/2 + 85, 20);
    }
    // kontra.context.fillText(connection.timeSinceLastPacket, connection.x, connection.y);
    this.dataCenterElements.forEach(element => kontra.sprite(element).render()); // eslint-disable-line no-undef
  }
}
