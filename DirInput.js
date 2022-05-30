class DirInput {
  constructor() {
    this.heldDirects = []
    this.map = {
      // arrows
      'ArrowUp'   : 'U',
      'ArrowLeft' : 'L',
      'ArrowDown' : 'D',
      'ArrowRight': 'R',
      // WASD
      'KeyW'      : 'U',
      'KeyA'      : 'L',
      'KeyS'      : 'D',
      'KeyD'      : 'R'
    }
  }

  get direction() {
    return this.heldDirects[0];
  }

  init() {
    document.addEventListener('keydown', e => {
      const dir = this.map[e.code];
      if (dir && this.heldDirects.indexOf(dir) === -1) {
        this.heldDirects.unshift(dir);
      }
    });
    
    document.addEventListener('keyup', e => {
      const dir = this.map[e.code];
      const index = this.heldDirects.indexOf(dir);
      if (index > -1) {
        this.heldDirects.splice(index, 1);
      }
    });
  }
}