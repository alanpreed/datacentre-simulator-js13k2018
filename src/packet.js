require('kontra');

export class Packet {
    constructor(x, y, speed, size) {
      this.sprite = kontra.sprite({
        x: x,
        y: y,
        color: 'red',
        width: size,
        height: size,
        dy: speed
      });

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
      this.sprite.render();
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