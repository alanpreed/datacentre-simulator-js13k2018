require("kontra");

export class Block {
  constructor(x, y, width, height, rotation, lifetime) {
    this.sprite = kontra.sprite({
      x: x,
      y: y,
      width: width,
      height: height,
      color: 'red',
    });
    this.rotation = rotation;
    this.lifetime = lifetime;
  }

  update(){
    this.lifetime -= 1;
  }

  render(){
    this.sprite.render();
  }
}