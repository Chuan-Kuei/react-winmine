const createMine = (width, height, maxMine) => {
  const mine = {};
  const mapSize = width * height;
  while (Object.keys(mine).length < maxMine) {
    let randomNum = ~~(Math.random() * mapSize);
    mine[randomNum] = 0;
  }
  return Object.keys(mine).map(k => +k);
};

const isOutofMap = (maxPosition, position) => {
  return position >= maxPosition || position < 0;
};

const validateBoundary = (minePosition, width) => {
  const isLeftBoundary = minePosition % width === 0;
  const isRightBoundary = (minePosition + 1) % width === 0;
  const leftLimit = ["left", "leftTop", "leftBottom"];
  const rightLimit = ["right", "rightTop", "rightBottom"];
  return position => {
    return (
      (isLeftBoundary && leftLimit.includes(position)) ||
      (isRightBoundary && rightLimit.includes(position))
    );
  };
};

const createTips = (mineMap, minePositionList, width) => {
  return minePositionList.reduce((result, minePosition) => {
    const isLeftBoundary = minePosition % width === 0;
    const isRightBoundary = (minePosition + 1) % width === 0;
    const maxPosition = mineMap.length;
    const isCloseBoundary = validateBoundary(minePosition, width);
    result[minePosition] = -1;
    const tipPositionList = {
      top: minePosition - width,
      bottom: minePosition + width,
      leftTop: minePosition - width - 1,
      left: minePosition - 1,
      leftBottom: minePosition + width - 1,
      rightTop: minePosition - width + 1,
      right: minePosition + 1,
      rightBottom: minePosition + width + 1
    };

    Object.keys(tipPositionList)
      .filter(p => !isOutofMap(maxPosition, tipPositionList[p]))
      .filter(p => !isCloseBoundary(p))
      .forEach(p => {
        const tipPosition = tipPositionList[p];
        result[tipPosition] = createTip(result[tipPosition]);
      });
    return result;
  }, mineMap);
};

const createTip = mapValue => {
  if (mapValue !== undefined && mapValue !== -1) {
    return mapValue + 1;
  }
  return mapValue;
};
const initMineMap = (width, height) => {
  const mapSize = width * height;
  return Array(mapSize).fill(0);
};

const createMineMap = (width, height, maxMine) => {
  const emptyMineMap = initMineMap(width, height);
  const minePosition = createMine(width, height, maxMine);
  const mineMap = createTips(emptyMineMap, minePosition, width);
  return {
    mineMap,
    minePosition
  };
};

export default createMineMap;
