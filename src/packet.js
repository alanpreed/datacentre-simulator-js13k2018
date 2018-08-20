require('kontra');

export class Packet {
    constructor(x, y, speed, width = 10, height = 10, rotation = 0) {
      this.sprite = kontra.sprite({
        x: x,
        y: y,
        color: 'red',
        width: width,
        height: height,
        dy: speed
      });

      this.lost = false;
    };

    update(){
      if(this.sprite.y > kontra.canvas.height) {
        this.lost = true;
      }
      else {
        this.sprite.update();
      }
    };

    render(){
      this.sprite.render();
    };
}