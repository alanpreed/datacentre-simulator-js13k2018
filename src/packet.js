require('kontra');

export class Packet {
  constructor(x, y, speed, radius) {
    this.sprite = kontra.sprite({
      x: x,
      y: y,
      color: 'red',
      dy: speed
    });
    this.radius = radius;
    this.lost = false;
  };

  update(){
    if(this.sprite.y > kontra.canvas.height) {
      this.lost = true;
    }
    else {
      this.sprite.update();
    }
  };

  render(){
    this.sprite.context.fillStyle = this.sprite.color;
    this.sprite.context.beginPath();
    this.sprite.context.arc(this.sprite.x, this.sprite.y, this.radius, 0, Math.PI*2);
    this.sprite.context.fill();
  };
}

function generatePackets() {
  return Array(10).fill(new Packet(Math.random(10), Math.random(10)));
}

export function generatePacket() {
  const packetWidth = 10;
  return new Packet(Math.random() * kontra.canvas.width, -packetWidth, Math.random() + 0.1, packetWidth);
}

export function setupPackets(numPackets) {
  const packets = [];

  for(var i = 0; i < numPackets; i++) {
    packets[i] = generatePacket();
  }
  return packets;
}