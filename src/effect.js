export class Effect {
  constructor(x, y, radius, lifetime) {
    this.x = x;
    this.y = y;
    this.color = 'red';
    this.radius = radius;
    this.lifetime = lifetime;
    this.finished = false;

    this.render = function () {
      this.context.strokeStyle = this.color;
      this.context.beginPath();
      this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      this.context.stroke();
    };
  }

  update() {
    if(this.lifetime > 0) {
      this.radius += 1;
      this.lifetime -= 1;
    }
    else {
      this.finished = true;
    }
  }
}

