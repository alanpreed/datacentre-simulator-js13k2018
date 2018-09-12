import { DataCenterElement } from '../datacenter-element';

export class DataCenter {
  constructor(level) {
    this.level = level;
    const startX = (kontra.canvas.width - 350) /2;
    const startY = 150;
    const size = 50;
    const spacing = 3 * size;
    this.shouldChangeGameState = false;

    const failingElement = Math.round(Math.random() * 5);
    const isFailingElement = (number) => { return failingElement === number;};
    const delay = Math.max(60, 200 - (level*10));
    this.dataCenterElements = [
      new DataCenterElement(startX + (0 * spacing), startY, size, size, isFailingElement(0), delay, 'NA'),
      new DataCenterElement(startX + (1 * spacing), startY, size, size, isFailingElement(1), delay, 'EU'),
      new DataCenterElement(startX + (2 * spacing), startY, size, size, isFailingElement(2), delay, 'AS'),
      new DataCenterElement(startX + (0 * spacing), startY + spacing, size, size, isFailingElement(3), delay, 'SA'),
      new DataCenterElement(startX + (1 * spacing), startY + spacing, 50, 50, isFailingElement(4), delay, 'AF'),
      new DataCenterElement(startX + (2 * spacing), startY + spacing, size, size, isFailingElement(5), delay, 'OC')];

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
    context.fillText('Peruvian Web Services System Overview', kontra.canvas.width/2 , 40);
    context.fillText('System status:', kontra.canvas.width/2 - 35, 70);
    if(this.failedElement) {
      context.fillStyle='red';
      context.fillText('ERROR', kontra.canvas.width/2 + 80, 70);
    } else {
      context.fillStyle='green';
      context.fillText('OK', kontra.canvas.width/2 + 65, 70);
    }
    this.dataCenterElements.forEach(element => kontra.sprite(element).render()); // eslint-disable-line no-undef
  }
}
