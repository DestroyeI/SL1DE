class Coin {
  constructor(config) {
    this.x = config.x*config.size;
    this.y = config.y*config.size;
    this.size = config.size;
    this.picked = false;
  }

  pick() {
    this.picked = true;
  }

  update(canvas) {
    !this.picked && this.render(canvas);
  }

  render(canvas) {
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#FFA500';
    ctx.fillRect(
      canvas.width/2-this.size/2+this.x, canvas.height/2-this.size/2+this.y,
      this.size, this.size
    );

    ctx.fillStyle = '#FFFF00';
    ctx.fillRect(
      canvas.width/2-this.size/2+this.x+this.size*0.1, canvas.height/2-this.size/2+this.y+this.size*0.1,
      this.size*0.8, this.size*0.8
    );
  }
}