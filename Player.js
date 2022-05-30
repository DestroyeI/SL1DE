class Player {
  constructor(config, map) {
    this.x = config.x*config.size;
    this.initX = config.x*config.size;
    this.y = config.y*config.size;
    this.initY = config.y*config.size;

    this.dirInput = new DirInput;
    this.dirInput.init();
    
    this.map = map;
    this.size = map.size;

    this.speed = config.speed;
    this.dir = false;
    
    this.coins = 0;
    this.SFX = {
      COIN: new Howl({
        src: ['/COIN.wav']
      }),
      SLIDE: new Howl({
        src: ['/SLIDE.wav'],
        loop: true
      }),
      SLIDEEND: new Howl({
        src: ['/SLIDEEND.wav']
      }),
      ENDLVL: new Howl({
        src: ['/ENDLVL.wav']
      })
    }
  }

  move(canvas) {
    const [prop, delta] = utils.getXYDir(this);
    this[prop] += delta;

    if (this.x > canvas.width/2-this.size/2 || this.x < -canvas.width/2+this.size/2) {
      this.x = this.initX;
      this.y = this.initY;
      this.dir = false;
      this.SFX.SLIDE.stop();
      this.SFX.SLIDEEND.play();
    }
    if (this.y > canvas.height/2-this.size/2 || this.y < -canvas.height/2+this.size/2) {
      this.x = this.initX;
      this.y = this.initY;
      this.dir = false;
      this.SFX.SLIDE.stop();
      this.SFX.SLIDEEND.play();
    }
  }

  checkCols(canvas) {
    let col = false;
    this.map.walls.forEach(wall => {
      if ((wall.x+this.size === this.x && this.dir === 'L') || (wall.x-this.size === this.x && this.dir === 'R')) {
        if (wall.y === this.y) {
          col = true;
        }
      }
      if ((wall.y+this.size === this.y && this.dir === 'U') || (wall.y-this.size === this.y && this.dir === 'D')) {
        if (wall.x === this.x) {
          col = true;
        }
      }
    });

    this.map.coins.forEach(coin => {
      if (coin.x === this.x && coin.y === this.y && !coin.picked) {
        this.coins += 1;
        this.SFX.COIN.play();
        coin.pick();
      }
    });
    
    if (this.x === this.map.goal.x && this.y === this.map.goal.y) {
      this.dir = false;
      this.SFX.SLIDE.stop();
      this.SFX.ENDLVL.play();
      this.map.end();
    }

    if (col) {
      this.dir = false;
      this.SFX.SLIDE.stop();
      this.SFX.SLIDEEND.play();
    } else {
      this.move(canvas);
    }
  }

  update(canvas) {
    if (this.dir) {
      this.checkCols(canvas);
    } else {
      if (this.dir === false && this.dirInput.direction) {
        this.SFX.SLIDE.play();
      }
      this.dir = this.dirInput.direction || false;
    }
    
    this.render(canvas);
  }

  render(canvas) {
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#000';
    ctx.fillRect(
      canvas.width/2-this.size/2+this.x, canvas.height/2-this.size/2+this.y,
      this.size, this.size
    );

    this.renderCoins(canvas);
  }

  renderCoins(canvas) {
    const coinCount = document.querySelector('.coinCount');
    coinCount.innerText = `${this.coins}`;
    coinCount.style['font-size'] = `${this.size*3}px`;
    coinCount.style.top = `${(canvas.style.top+this.size)*18}px`;
    coinCount.style.left = `${(canvas.style.left+this.size*1.5)*22}px`;
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = '#FFA500';
    ctx.fillRect(
      this.size/2, this.size/2,
      this.size, this.size
    );

    ctx.fillStyle = '#FFFF00';
    ctx.fillRect(
      this.size/2+this.size*0.1, this.size/2+this.size*0.1,
      this.size*0.8, this.size*0.8
    );
  }
}