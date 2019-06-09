import createMineMap from "./MineMap";
const nativeMath = global.Math;

const setupMockData = () => {
  const mockMath = Object.create(global.Math);
  mockMath.random = () => {
    const fakeRandom = mockMath.fakeRandom;
    const isArrayData = fakeRandom && fakeRandom instanceof Array;
    if (!isArrayData || fakeRandom.length === 0) {
      return nativeMath.random();
    }
    return fakeRandom.pop();
  };
  global.Math = mockMath;
};

const clearSetup = () => {
  global.Math = nativeMath;
};

describe("Create MineMap 9*9 and mine 9 ", () => {
  beforeAll(() => {
    setupMockData();
  });

  test("create correct map", () => {
    // Given
    const width = 9;
    const height = 9;
    const mapSize = width * height;
    const mine = 9;

    // When
    const { mineMap, minePosition } = createMineMap(width, height, mine);

    // Then
    expect(mineMap).toHaveLength(width * height);
    expect(minePosition).toHaveLength(mine);
  });

  test("mine position 0~9 , and tips correct", () => {
    // Given
    const width = 9;
    const height = 9;
    const mapSize = width * height;
    const mine = 9;
    const expectMinePosition = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    Math.fakeRandom = expectMinePosition.map(p => {
      return p / mapSize;
    });
    const expectTipsFor9To17 = [2, 3, 3, 3, 3, 3, 3, 3, 2];

    // When
    const { mineMap, minePosition } = createMineMap(width, height, mine);

    // Then
    expect(mineMap).toHaveLength(width * height);
    expect(minePosition).toHaveLength(mine);
    expect(minePosition).toEqual(expectMinePosition);
    for (let i = 0; i < 9; i++) {
      expect(mineMap[i]).toEqual(-1);
    }
    for (let i = 9; i <= 17; i++) {
      expect(mineMap[i]).toEqual(expectTipsFor9To17[i - 9]);
    }
    for (let i = 18; i < mapSize; i++) {
      expect(mineMap[i]).toEqual(0);
    }
  });

  afterAll(() => {
    clearSetup();
  });
});
