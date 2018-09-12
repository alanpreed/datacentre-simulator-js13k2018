export class DataCenterElement {
  constructor(x, y, width, height, shouldFail, failureDelay) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.isFailed = false;
    this.shouldFail = shouldFail;
    this.failureDelay = failureDelay;
    this.time = 0;

    this.shouldRenderFail = () => {
      return this.time%20 === 0;
    };

    this.render = function() {
      this.context.strokeStyle = '#272727';
      this.context.lineWidth = 10;
      this.context.strokeRect(this.x, this.y, this.width, this.height);
      if(this.isFailed) {
        if(this.shouldRenderFail()) {
          this.context.fillStyle = 'red';
        }
      } else {
        this.context.fillStyle = 'rgba(251, 86, 7, 0.5)';
      }
      this.context.fillRect(this.x, this.y, this.width, this.height);
    };
  }

  shouldRender() {
    return this.connectionDelay <= 0 && !this.isInactive();
  }

  isActive() {
    return this.shouldFail && !this.isFailed;
  }

  update() {
    this.time++;
    if(this.isActive()) {
      this.failureDelay --;
      if(this.failureDelay === 0) {
        this.isFailed = true;
      }
    }
  }
}
