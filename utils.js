const utils = {
  getXYDir(obj) {
    if (obj.dir === 'R') {
      return ['x', obj.speed];
    } else if (obj.dir === 'L') {
      return ['x', -obj.speed];
    } else if (obj.dir === 'D') {
      return ['y', obj.speed];
    } else if (obj.dir === 'U') {
      return ['y', -obj.speed];
    }
    return [null, null];
  },
  randFromArray(array) {
    return array[ Math.floor(Math.random()*array.length) ];
  }
}