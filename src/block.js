export class Block {
  constructor(x, y, width, height, rotation, lifetime) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = 'green';
    this.rotation = rotation;
    this.lifetime = lifetime;
    this.render = function() {
      this.context.save();
      this.context.translate(this.x, this.y);
      this.context.rotate(this.rotation);
      this.context.fillStyle = this.color;
      this.context.fillRect(0, 0, this.width, this.height);
      this.context.restore();
    }
  }

  update(){
    this.lifetime -= 1;
  }

}