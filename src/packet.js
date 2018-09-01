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

    this.render = function(){
      this.context.fillStyle = this.color;
      this.context.beginPath();
      this.context.arc(this.x, this.y, this.radius, 0, Math.PI*2);
      this.context.fill();
    };
  };

  update(){
    if(this.y > this.canvasHeight) {
      this.lost = true;
    }
    else {
      this.y += this.dy;
    }
  };
}
