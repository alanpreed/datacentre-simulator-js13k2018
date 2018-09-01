export class Packet {
  constructor(x, y, speed, radius, canvasWidth, canvasHeight) {
    this.x = x;
    this.y = y;
    this.color = 'red';
    this.dy = speed;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.radius = radius;
    this.lost = false;
    this.stop = false;

    this.render = function(){
      this.context.fillStyle = this.color;
      this.context.beginPath();
      this.context.arc(this.x, this.y, this.radius, 0, Math.PI*2);
      this.context.fill();
    };
  };

  checkBlockCollisions(blocks) {
    blocks.forEach(block => {
      let result = this.calculateClosestPoint(block);
      let xmax = (block.width / 2) * Math.cos(block.rotation);
      let ymax = (block.width / 2) * Math.sin(block.rotation);
      if((result[0] > block.x - xmax && result[0] < block.x + xmax) ||
         (result[1] > block.y - ymax && result[1] < block.y + ymax)) {
        if(result[2] < this.radius) {
          this.stop = true;
        }
      }
      else {
        this.stop = false;
      }
    });

  }

  update(){
    if(this.y > this.canvasHeight) {
      this.lost = true;
    }
    else {
      if(!this.stop) {
        this.y += this.dy;
      }
    }
  };

  calculateLineEquation(block) {
    // From our position and rotation:
    // y = (x - x0)tan(theta) + y0
    // Require equation of the form ax + by + c = 0
    // -xtan(theta) + y + x0tan(theta) - y0 = 0
    let a = -Math.tan(block.rotation);
    let b = 1;
    let c = (block.x * Math.tan(block.rotation)) - block.y;
    return [a, b, c];
  }

  calculateClosestPoint(block) {
    // From Wikipedia (https://en.wikipedia.org/wiki/Distance_from_a_point_to_a_line):
    // x = (b(b * x0 - a * y0) - ac)/(a^2 + b^2)
    // y = (a(-b * x0 + a * y0) - bc)/(a^2 + b^2)

    let coeffs = this.calculateLineEquation(block);
    let a = coeffs[0];
    let b = coeffs[1];
    let c = coeffs[2];

    let x = (b * (b * this.x - a * this.y) - (a * c)) / (Math.pow(a, 2) + Math.pow(b, 2));

    let y = (a * (-b * this.x + a * this.y) - (b * c)) / (Math.pow(a, 2) + Math.pow(b, 2));

    let dist = Math.abs((a * this.x) + (b * this.y) + c) / Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2))
    return [x,y, dist];
  }
}
