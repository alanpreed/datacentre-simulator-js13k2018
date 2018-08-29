export class Block {
  constructor(x, y, width, height, rotation, lifetime) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = 'green';
    this.rotation = rotation;
    this.lifetime = lifetime;
  }

  update(){
    this.lifetime -= 1;
  }

  render(){
    this.context.save();
    this.context.translate(this.sprite.x, this.sprite.y);
    this.context.rotate(this.sprite.rotation);
    this.context.fillStyle = this.sprite.color;
    this.context.fillRect(0, 0, this.sprite.width, this.sprite.height);
    this.context.restore();
  }
}