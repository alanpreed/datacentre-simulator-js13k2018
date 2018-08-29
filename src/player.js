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
      rotation: 0.7,
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
      render: function(){
        this.context.save();
    
        this.context.translate(this.x, this.y);
        this.context.rotate(this.rotation);
        this.context.fillStyle = this.color;
        this.context.fillRect(0, 0, this.width, this.height);
    
        this.context.restore();
      }

    });

    kontra.pointer.track(this.sprite);
    kontra.keys.bind('up', this.sprite.onArrowUp);
    kontra.keys.bind('down', this.sprite.onArrowDown);
  }

  update(){
    this.sprite.blocks.forEach(block => kontra.sprite(block).update());
    for(var i = 0; i < this.sprite.blocks.length; i++){
      if(this.sprite.blocks[i].lifetime == 0){
        this.sprite.blocks.splice(i, 1);
      }
    }

    this.sprite.x = kontra.pointer.x;
    this.sprite.y = kontra.pointer.y;
  }

  render(){
    this.sprite.blocks.forEach(block => kontra.sprite(block).render());
    this.sprite.render();
    // this.sprite.context.save();
    // this.sprite.context.translate(this.sprite.x, this.sprite.y);
    // this.sprite.context.rotate(this.sprite.rotation);
    // this.sprite.context.fillStyle = this.sprite.color;
    // this.sprite.context.fillRect(0, 0, this.sprite.width, this.sprite.height);
    // this.sprite.context.restore();
  }
}
