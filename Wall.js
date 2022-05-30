class Wall {
  constructor(config) {
    this.x = config.x*config.size;
    this.y = config.y*config.size;
    this.size = config.size;
  }

  update(canvas, map) {
    this.render(canvas, map);
  }

  render(canvas, map) {
    const ctx = canvas.getContext('2d');
    const [x, y] = [(this.x/this.size)+map[0].length/2, (this.y/this.size)+map.length/2];

    let left = false;
    let right = false;
    let up = false;
    let down = false;

    if (x > 0) {
      left = map[y][x-1] === 1;
    }
    if (y > 0) {
      up = map[y-1][x] === 1;
    }
    if (y < map.length-1) {
      down = map[y+1][x] === 1;
    }
    if (x < map[y].length-1) {
      right = map[y][x+1] === 1;
    }

    ctx.fillStyle = 'grey';
    ctx.fillRect(
      canvas.width/2-this.size/2+this.x, canvas.height/2-this.size/2+this.y,
      this.size, this.size
    );

    ctx.fillStyle = '#fff';
    ctx.fillRect(
      canvas.width/2-this.size/2+this.x+this.size*(left ? 0 : 0.1), canvas.height/2-this.size/2+this.y+this.size*(up ? 0 : 0.1),
      this.size*((right ? 0.9 : 0.8) + (left ? 0.1 : 0)), this.size*((down ? 0.9 : 0.8) + (up ? 0.1 : 0))
    );
  }
}