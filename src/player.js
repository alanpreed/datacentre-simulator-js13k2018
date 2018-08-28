require("kontra");

export class Player{
  constructor(){
    this.rotation = 0;
    this.blocks = [];

    this.sprite = kontra.sprite({
      x: kontra.pointer.x,
      y: kontra.pointer.y,
      width: 5,
      height: 5,
      color: "blue",
      onDown: function() {
        placeBlock(this.x, this.y);
      },
      onUp: function() {
      },
      onOver: function() {
      }
    });
    kontra.pointer.track(this.sprite);
  }

  placeBlock(x, y){

  }

  update(){
    this.sprite.x = kontra.pointer.x;
    this.sprite.y = kontra.pointer.y;
  }

  render(){
    this.sprite.render();
  }
}
