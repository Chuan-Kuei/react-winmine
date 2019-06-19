import Const from "../components/Const";
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

const validateBoundary = (minePositions, width) => {
  const isLeftBoundary = minePositions % width === 0;
  const isRightBoundary = (minePositions + 1) % width === 0;
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
  return minePositionList.reduce((result, minePositions) => {
    const isLeftBoundary = minePositions % width === 0;
    const isRightBoundary = (minePositions + 1) % width === 0;
    const maxPosition = mineMap.length;
    const isCloseBoundary = validateBoundary(minePositions, width);
    result[minePositions] = Const.MINE;
    const tipPositionList = {
      top: minePositions - width,
      bottom: minePositions + width,
      leftTop: minePositions - width - 1,
      left: minePositions - 1,
      leftBottom: minePositions + width - 1,
      rightTop: minePositions - width + 1,
      right: minePositions + 1,
      rightBottom: minePositions + width + 1
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
  if (mapValue !== undefined && mapValue !== Const.MINE) {
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
  const minePositions = createMine(width, height, maxMine);
  const mineMap = createTips(emptyMineMap, minePositions, width);
  return {
    mineMap,
    minePositions
  };
};

export default createMineMap;
