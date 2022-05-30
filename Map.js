class Map {
  constructor(config) {
    this.canvas = config.canvas;
    this.ctx = config.canvas.getContext('2d');
    this.size = config.size;
    this.speed = config.speed;

    this.set();
  }

  set() {
    this.walls = [];
    this.coins = [];
    this.goal = false;
    this.player = false;
    this.map = Maps.splice(Maps.indexOf(utils.randFromArray(Maps)),1)[0] || [ [4,1,4], [1,3,1], [4,1,4] ];

    this.map.forEach((row, y) => {
      row.forEach((val, x) => {
        if (val === 4) {
          this.coins.push(new Coin({x: x-row.length/2, y: y-this.map.length/2, size: this.size}));
        } else if (val === 3) {
          this.player = new Player({x: x-row.length/2, y: y-this.map.length/2, size: this.size, speed: this.speed}, this)
        } else if (val === 2) {
          this.goal = new Goal({x: x-row.length/2, y: y-this.map.length/2, size: this.size})
        } else if (val === 1) {
          this.walls.push(new Wall({x: x-row.length/2, y: y-this.map.length/2, size: this.size}));
        }
      })
    })
  }

  end() {
    this.set();
  }

  start() {

    const step = () => {

      this.ctx.clearRect(
        0, 0,
        this.canvas.width, this.canvas.height
      );

      this.walls.forEach(wall => {
        wall.update(this.canvas, this.map);
      });
      this.coins.forEach(coin => {
        coin.update(this.canvas);
      });

      this.goal && this.goal.update(this.canvas);
      this.player && this.player.update(this.canvas)

      requestAnimationFrame(step);
    }

    step();
  }
}