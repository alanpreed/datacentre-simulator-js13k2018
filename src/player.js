import { Block } from "./block";

require("kontra");

export class Player{
  constructor(){
    const blockWidth = 5;
    const blockHeight = 5;

    this.sprite = kontra.sprite({
      x: kontra.pointer.x,
      y: kontra.pointer.y,
      width: blockWidth,
      height: blockHeight,
      rotation: 0.3,
      color: "blue",
      blocks: [],
      onDown: function() {
        this.blocks.push(new Block(this.x, this.y, this.width, this.height, this.rotation, 60));
        console.log("rotation: " + this.rotation);
      },
      onUp: function() {
      },
      onOver: function() {
      },
      onArrowDown: function(){
        console.log("rotation: " + this.rotation);
        this.rotation -= 10;
        console.log(this.rotation);
      },

      onArrowUp: function(){
        console.log("rotation: " + this.rotation);
        this.rotation += 10;
        console.log(this.rotation);
      },
    });
    kontra.pointer.track(this.sprite);
    kontra.keys.bind('up', this.sprite.onArrowUp);
    kontra.keys.bind('down', this.sprite.onArrowDown);
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

    this.sprite.context.save();
    
    this.sprite.context.translate(this.sprite.x, this.sprite.y);
    this.sprite.context.rotate(this.sprite.rotation);
    this.sprite.context.fillStyle = this.sprite.color;
    this.sprite.context.fillRect(0, 0, this.sprite.width, this.sprite.height);
    
    //this.sprite.render();
    this.sprite.context.restore();
  }
}
