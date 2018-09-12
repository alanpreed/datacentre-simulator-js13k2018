import { DataCenterElement } from '../datacenter-element';

export class DataCenter {
  constructor(level) {
    this.level = level;
    const startX = (kontra.canvas.width - 350) /2;
    const size = 50;
    this.shouldChangeGameState = false;

    const failingElement = Math.round(Math.random() * 4);
    const isFailingElement = (number) => { return failingElement === number;};
    const delay = Math.max(60, 200 - (level*10));
    this.dataCenterElements = [
      new DataCenterElement(startX + size, 50, size, size, isFailingElement(0), delay),
      new DataCenterElement(startX + size, 180, size, size, isFailingElement(1), delay),
      new DataCenterElement(startX + 100 + size, size, size, size, isFailingElement(2), delay),
      new DataCenterElement(startX + 200 + size, 50, size, size, isFailingElement(3), delay),
      new DataCenterElement(startX + 200 + size, 180, 50, 50, isFailingElement(4), delay)];

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
    context.font = '20px Helvetica';
    context.fillStyle = '#E5DADA';
    context.textAlign ='center';
    context.fillText('System status:', kontra.canvas.width/2 - 50, 20);
    if(this.failedElement) {
      context.fillStyle='red';
      context.fillText('ERROR', kontra.canvas.width/2 + 80, 20);
    } else {
      context.fillStyle='green';
      context.fillText('OK', kontra.canvas.width/2 + 65, 20);
    }
    // kontra.context.fillText(connection.timeSinceLastPacket, connection.x, connection.y);
    this.dataCenterElements.forEach(element => kontra.sprite(element).render()); // eslint-disable-line no-undef
  }
}
