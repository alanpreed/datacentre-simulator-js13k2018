export class Connection {
  constructor(x, y, width, height, connectionLife) {
    this.x = x;
    this.y = y;
    this.color = "#00E52D";
    this.width = width;
    this.height = height;
    this.connectionLife = connectionLife;
    this.startLife = connectionLife;
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

  update() {
    this.connectionLife--;
    this.color = this.getCurrentColour();
  }
}

export function generateConnection() {
  console.log('entered');
  const isBottom = Math.floor((Math.random() * 2)) === 0 ? true : false;
  return isBottom? createBottomConnection() : createSideConnection();
}

export function setupConnections() {
  return Array(5).fill(null).map(() => generateConnection());
}

function createBottomConnection() {
  return new Connection(Math.random() * kontra.canvas.width, kontra.canvas.height-50, 20, 30, 10000);
}

function createSideConnection() {
  return new Connection(kontra.canvas.width - 50, Math.random() * kontra.canvas.height, 30, 20, 10000);
}
