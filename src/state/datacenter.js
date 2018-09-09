import { DataCenterElement } from '../datacenter-element';

export class DataCenter {
  constructor() {
    const startX = (kontra.canvas.width - 350) /2;
    const size = 50;
    this.dataCenterElements = [
      new DataCenterElement(startX + size, 50, size, size, true, 1000),
      new DataCenterElement(startX + size, 180, size, size, false),
      new DataCenterElement(startX + 100 + size, size, size, size, false),
      new DataCenterElement(startX + 200 + size, 50, size, size, false),
      new DataCenterElement(startX + 200 + size, 180, 50, 50, false)];
  }

  update() {
    this.dataCenterElements.forEach(element => element.update());
    const failedElement = this.dataCenterElements.find(element => element.isFailed);
    return failedElement ? 'insideElement' : 'dataCenter';
  }

  render() {
    this.dataCenterElements.forEach(element => kontra.sprite(element).render()); // eslint-disable-line no-undef
  }
}
