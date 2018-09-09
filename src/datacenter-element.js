export class DataCenterElement {
  constructor(x, y, width, height, shouldFail, failureDelay) {
    this.x = x;
    this.y = y;
    this.color = '#FF5733';
    this.width = width;
    this.height = height;
    this.isFailed = false;
    this.shouldFail = shouldFail;
    this.failureDelay = failureDelay;
  }

  shouldRender() {
    return this.connectionDelay <= 0 && !this.isInactive();
  }

  isActive() {
    return this.shouldFail && !this.isFailed;
  }

  update() {
    if(this.isActive()) {
      this.failureDelay --;
      if(this.failureDelay === 0) {
        this.isFailed = true;
        this.color = 'red';
      }
    }
  }
}
