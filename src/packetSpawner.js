import { Packet } from './packet';

export class packetSpawner {
  constructor(rate, canvasWidth, canvasHeight) {
    this.rate = rate;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.packetWidth = 4;

    let side = Math.round(Math.random() * 3);

    switch (side) {
      case 0:
        this.x = -this.packetWidth;
        this.y = this.packetWidth + (Math.random() * (this.canvasHeight - (2 * this.packetWidth)));
        break;
      case 1:
        this.x = this.packetWidth + (Math.random() * (this.canvasWidth - (2 * this.packetWidth)))
        this.y = -this.packetWidth;
        break;
      case 2:
        this.x = this.canvasWidth + this.packetWidth;
        this.y = this.packetWidth + (Math.random() * (this.canvasHeight - (2 * this.packetWidth)));
        break;
      case 3:
        this.x = this.packetWidth + (Math.random() * (this.canvasWidth - (2 * this.packetWidth)))
        this.y = this.canvasHeight + this.packetWidth;
        break;
      default:
    }

    // Don't let packets spawn less than 15 degrees from a side
    let minRotation = Math.PI / 12;

    if(this.x < this.canvasWidth / 2) {
      this.rotation = minRotation + (Math.random() * ((Math.PI / 2) - (2 * minRotation)));
    }
    else {
      this.rotation = (Math.PI / 2) + minRotation + (Math.random() * ((Math.PI / 2) - (2 * minRotation)));
    }
    if(this.y > this.canvasHeight / 2) {
      this.rotation *= -1;
    }
  }

  checkSpawnPacket() {
    return Math.random() < this.rate;
  }

  generatePacket() {
    return new Packet(this.x, this.y, 2*(Math.random() + 1), this.rotation, this.packetWidth, this.canvasWidth, this.canvasHeight);
  }
}
