import { Packet } from './packet';

export class packetSpawner {
  constructor(rate, canvasWidth, canvasHeight) {
    this.rate = rate;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.packetWidth = 4;

    this.x = -this.packetWidth;
    this.y = this.packetWidth + (Math.random() * (this.canvasHeight - (2 * this.packetWidth)));
    if(this.y < this.canvasHeight / 2) {
      this.rotation = Math.random() * Math.PI / 2
    }
    else {
      this.rotation = -Math.random() * Math.PI / 2
    }
  }

  checkSpawnPacket() {
    return Math.random() < this.rate;
  }

  generatePacket() {
    return new Packet(this.x, this.y, Math.random() + 1, this.rotation, this.packetWidth, this.canvasWidth, this.canvasHeight);
  }
}
