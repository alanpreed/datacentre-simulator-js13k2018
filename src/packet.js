export class Packet {
  constructor(x, y, speed, rotation, radius, canvasWidth, canvasHeight) {
    this.x = x;
    this.y = y;
    this.color = 'red';
    this.dx = speed * Math.cos(rotation);
    this.dy = speed * Math.sin(rotation);
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.radius = radius;
    this.lost = false;
    this.stop = false;

    this.render = function () {
      this.context.fillStyle = this.color;
      this.context.beginPath();
      this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      this.context.fill();
    };
  }

  checkBlockCollisions(blocks) {
    var collisionX, collisionY;

    blocks.forEach((block) => {
      const {x, y, dist} = this.calculateClosestPoint(block);
      const xlen = (block.width / 2) * Math.cos(block.rotation);
      const ylen = (block.width / 2) * Math.sin(block.rotation);

      let minXpos = block.x - xlen;
      let minYpos = block.y - ylen;
      let maxXpos = block.x + xlen;
      let maxYpos = block.y + ylen;

      if ((x > Math.min(minXpos, maxXpos) && x < Math.max(minXpos, maxXpos))
        || (y > Math.min(minYpos, maxYpos) && y < Math.max(minYpos, maxYpos))) {
        if (dist < this.radius) {
          this.bounce(block);
          collisionX = x;
          collisionY = y;
        }
      }
    });
    return {x: collisionX, y: collisionY};
  }

  update() {
    if (this.x < -this.radius || this.x > this.canvasWidth + this.radius ||
        this.y < -this.radius || this.y > this.canvasHeight + this.radius) {
      this.lost = true;
    } else {
      this.x += this.dx;
      this.y += this.dy;
    }
  }

  calculateLineEquation(block) {
    // From our position and rotation:
    // y = (x - x0)tan(theta) + y0
    // Require equation of the form ax + by + c = 0
    // -xtan(theta) + y + x0tan(theta) - y0 = 0
    const a = -Math.tan(block.rotation);
    const b = 1;
    const c = (block.x * Math.tan(block.rotation)) - block.y;
    return {a, b, c};
  }

  calculateClosestPoint(block) {
    // From Wikipedia (https://en.wikipedia.org/wiki/Distance_from_a_point_to_a_line):
    // x = (b(b * x0 - a * y0) - ac)/(a^2 + b^2)
    // y = (a(-b * x0 + a * y0) - bc)/(a^2 + b^2)

    const { a, b, c }  = this.calculateLineEquation(block);

    const x = (b * (b * this.x - a * this.y) - (a * c)) / (Math.pow(a, 2) + Math.pow(b, 2));

    const y = (a * (-b * this.x + a * this.y) - (b * c)) / (Math.pow(a, 2) + Math.pow(b, 2));

    const dist = Math.abs((a * this.x) + (b * this.y) + c) / Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
    return {x, y, dist};
  }

  bounce(block) {
    let v = this.pythagoras(this.dx, this.dy);
    let vAngle = Math.atan2(this.dx, this.dy);
    let vPara = v * Math.sin(vAngle + block.rotation);
    let vPerp = v * Math.cos(vAngle + block.rotation);

    vPerp = vPerp * -block.restitution;

    v = this.pythagoras(vPara, vPerp);
    vAngle = Math.atan2(vPerp, vPara);    
    this.dx = v * Math.cos(vAngle + block.rotation);
    this.dy = v * Math.sin(vAngle + block.rotation);
  }

  pythagoras(x, y) {
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  }
}
