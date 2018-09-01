export class Connection {
  constructor(x, y, width, height, connectionLife, requiredPackets) {
    this.x = x;
    this.y = y;
    this.color = "#00E52D";
    this.width = width;
    this.height = height;
    this.connectionDelay = Math.random() * 250;
    this.connectionLife = connectionLife;
    this.requiredPackets = requiredPackets;
    this.startLife = connectionLife;
    this.isSuccesful = false;
    this.gradient = ['#00E52D', '#02E701', '#32E902', '#63EC03', '#95EE05', 'C7F006', '#F3EC07', '#F5BE09', '#F78F0A', '#FA600C', '#FC310D', '#FF0F1B'];
    this.gradient.reverse();
  }

  getCurrentColour() {
    for(let i = 1; i < this.gradient.length; i++) {
      if(this.connectionLife < (this.startLife/this.gradient.length) * i) {
        return this.gradient[i];
      } 
    }
    return "#00E52D";
  }

  shouldRender() {
    return this.connectionDelay <= 0;
  }
  
  isInactive() {
    return this.isLost || this.isSuccesful;
  }

  update() {
    if(this.connectionLife === 0 && this.requiredPackets > 0) {
      this.isLost = true;
    } else if(this.requiredPackets === 0) {
      this.isSuccesful = true;
    } else if(this.connectionDelay > 0 ) {
      this.connectionDelay --;
    } else {
      this.connectionLife--;
      this.color = this.getCurrentColour();
    }
  }
}

export function generateConnection() {
  const isBottom = Math.floor((Math.random() * 2)) === 0 ? true : false;
  return isBottom? createBottomConnection() : createSideConnection();
}

export function setupConnections() {
  return Array(5).fill(null).map(() => generateConnection());
}

function createBottomConnection() {
  return new Connection(Math.random() * kontra.canvas.width, kontra.canvas.height-50, 20, 30, 2000, 10);
}

function createSideConnection() {
  return new Connection(kontra.canvas.width - 50, Math.random() * kontra.canvas.height, 30, 20, 2000, 10);
}
