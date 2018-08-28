import { Block } from "./block";

require("kontra");

export class Player{
  constructor(){
    this.rotation = 0;
    //this.blocks = [];

    this.sprite = kontra.sprite({
      x: kontra.pointer.x,
      y: kontra.pointer.y,
      width: 5,
      height: 5,
      color: "blue",
      blocks: [],
      onDown: function() {
        this.blocks.push(new Block(this.x, this.y, this.width, this.height, 0, 30));
        //this.placeBlock(this.x, this.y, this.width, this.height, this.rotation, this.lifetime);
      },
      onUp: function() {
      },
      onOver: function() {
      }
    });
    kontra.pointer.track(this.sprite);
  }

  placeBlock(x, y, width, height, rotation, lifetime){
    this.blocks.push(new Block(this.x, this.y, this.width, this.height, 0, 30));
  }

  update(){
    this.sprite.blocks.forEach(block => block.update());
    for(var i = 0; i < this.sprite.blocks.length; i++){
      if(this.sprite.blocks[i].lifetime == 0){
        this.sprite.blocks.splice(i, 1);
      }
    }

    this.sprite.x = kontra.pointer.x;
    this.sprite.y = kontra.pointer.y;
  }

  render(){
    this.sprite.blocks.forEach(block => block.render());
    this.sprite.render();
  }
}
