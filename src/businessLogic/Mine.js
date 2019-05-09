function Mine(width, height, maxMine) {
  this.width = width;
  this.height = height;
  this.maxMine = maxMine;
  this.mineMap = {};
  this.mine = [];
}

Mine.prototype.getMineMap = function() {
  return this.mineMap;
};

Mine.prototype.getMine = function() {
  return this.mine;
};

Mine.prototype.createMine = function() {
  const mine = {};
  const mapSize = this.width * this.height;
  while (Object.keys(mine).length < this.maxMine) {
    let randomNum = ~~(Math.random() * mapSize);
    mine[randomNum] = 0;
  }
  this.mine = Object.keys(mine);
};

Mine.prototype.createTips = function() {
  const mineMap = this.mineMap;
  const width = this.width;
  this.mine.forEach(mine => {
    mineMap[mine] = -1;
    this.createTip(mine - width - 1);
    this.createTip(mine - width);
    this.createTip(mine - width + 1);
    this.createTip(mine - 1);
    this.createTip(+mine + 1);
    this.createTip(+mine + width + 1);
    this.createTip(+mine + width);
    this.createTip(+mine + width - 1);
  });
  this.mineMap = mineMap;
};

Mine.prototype.createTip = function(position) {
  const mineMap = this.mineMap;
  if (mineMap[position] !== undefined && mineMap[position] !== -1) {
    mineMap[position]++;
  }
};

Mine.prototype.initMineMap = function() {
  const mapSize = this.width * this.height;
  this.mineMap = Array(mapSize - 1).fill(0);
};

Mine.prototype.createMineMap = function() {
  this.initMineMap();
  this.createMine();
  this.createTips();
};

module.exports = Mine;