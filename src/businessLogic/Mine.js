function Mine(width, height, maxMine) {
  this.width = width;
  this.height = height;
  this.maxMine = maxMine;
  this.mineMap = {};
}

Mine.prototype.getMineMap = function() {
  this.createMine();
  this.fillTips();
  this.fillEmpty();
  return this.mineMap;
};

Mine.prototype.createMine = function() {
  const mineMap = {};
  const mapSize = this.width * this.height;
  while (Object.keys(mineMap).length < this.maxMine) {
    let randomNum = ~~(Math.random() * mapSize + 1);
    mineMap[randomNum] = -1;
  }
  this.mineMap = mineMap;
};

Mine.prototype.fillTips = function() {};

Mine.prototype.fillEmpty = function() {};

module.exports = Mine;
