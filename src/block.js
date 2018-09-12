export class Block {
  constructor(x, y, width, height, rotation) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = '#E59500';
    this.rotation = rotation;
    this.restitution = 1;
    this.render = function() {
      this.context.save();
      this.context.translate(this.x, this.y);
      this.context.rotate(this.rotation);
      this.context.fillStyle = this.color;
      this.context.fillRect(-this.width/2, -this.height/2, this.width, this.height);
      this.context.restore();
    };
  }
}
