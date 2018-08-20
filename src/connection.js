export class Connection {
  constructor(x, y, width, height, connectionLife) {
    this.x = x;
    this.y = y;
    this.color = "green";
    this.width = width;
    this.height = height;
    this.connectionLife = connectionLife;
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
  return new Connection(Math.random() * kontra.canvas.width, kontra.canvas.height-50, 20, 30, 6000);
}

function createSideConnection() {
  return new Connection(kontra.canvas.width - 50, Math.random() * kontra.canvas.height, 20, 30, 6000);
}
