import createMineMap from "../../src/businessLogic/MineMap";
import math from "../utils/math";

describe("Create MineMap 9*9 and mine 9 ", () => {
  // Given
  const width = 9;
  const height = 9;
  const mapSize = width * height;
  const mine = 9;
  const mockRandom = expectMinePosition => {
    Math.fakeRandom = expectMinePosition.map(p => {
      return p / mapSize;
    });
  };
  const assertMapCorrect = (mineMap, minePosition) => {
    expect(mineMap).toHaveLength(width * height);
    expect(minePosition).toHaveLength(mine);
  };

  const createArraySequence = (from, to) => {
    return Array.from(Array(to - from + 1).keys()).map(k => k + from);
  };
  const assertMapValue = (mineMap, expectData) => {
    Object.keys(expectData).forEach(position => {
      expect(mineMap[position]).toEqual(expectData[position]);
    });
  };
  const assertEmptyBrick = (mineMap, from, to) => {
    const validatePosition = createArraySequence(from, to);
    Object.keys(validatePosition).forEach(n => {
      expect(mineMap[validatePosition[n]]).toEqual(0);
    });
  };
  const assertMine = (mineMap, minePosition, expectList) => {
    const expectObj = expectList.reduce((result, v) => {
      return {
        [v]: -1
      };
    }, {});
    assertMapValue(mineMap, expectObj);
  };

  beforeAll(() => {
    math.setupMock();
  });

  beforeEach(() => {
    Math.clearFakeRandom();
  });

  afterAll(() => {
    math.resetMath();
  });

  test("create correct map", () => {
    // When
    const { mineMap, minePosition } = createMineMap(width, height, mine);

    // Then
    assertMapCorrect(mineMap, minePosition);
  });

  test("mine position in first column , and tips correct", () => {
    // Given
    const expectTips = {
      9: 2,
      10: 3,
      11: 3,
      12: 3,
      13: 3,
      14: 3,
      15: 3,
      16: 3,
      17: 2
    };
    const expectMinePosition = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    mockRandom(expectMinePosition);

    // When
    const { mineMap, minePosition } = createMineMap(width, height, mine);

    // Then
    assertMapCorrect(mineMap, minePosition);
    assertMine(mineMap, minePosition, expectMinePosition);
    assertMapValue(mineMap, expectTips);
    assertEmptyBrick(mineMap, 18, 80);
  });

  test("mine position in last column , and tips correct", () => {
    // Given
    const expectTips = {
      63: 2,
      64: 3,
      65: 3,
      66: 3,
      67: 3,
      68: 3,
      69: 3,
      70: 3,
      71: 2
    };
    const expectMinePosition = [72, 73, 74, 75, 76, 77, 78, 79, 80];
    mockRandom(expectMinePosition);

    // When
    const { mineMap, minePosition } = createMineMap(width, height, mine);

    // Then
    assertMapCorrect(mineMap, minePosition);
    assertMine(mineMap, minePosition, expectMinePosition);
    assertMapValue(mineMap, expectTips);
    assertEmptyBrick(mineMap, 0, 62);
  });

  test("mine position in first row , and tips correct", () => {
    // Given
    const expectTips = {
      1: 2,
      10: 3,
      19: 3,
      28: 3,
      37: 3,
      46: 3,
      55: 3,
      64: 3,
      73: 2
    };
    const expectMinePosition = [0, 9, 18, 27, 36, 45, 54, 63, 72];
    mockRandom(expectMinePosition);

    // When
    const { mineMap, minePosition } = createMineMap(width, height, mine);

    // Then
    assertMapCorrect(mineMap, minePosition);
    assertMine(mineMap, minePosition, expectMinePosition);
    assertMapValue(mineMap, expectTips);
    assertEmptyBrick(mineMap, 2, 8);
    assertEmptyBrick(mineMap, 11, 17);
    assertEmptyBrick(mineMap, 20, 26);
    assertEmptyBrick(mineMap, 29, 35);
    assertEmptyBrick(mineMap, 38, 44);
    assertEmptyBrick(mineMap, 47, 53);
    assertEmptyBrick(mineMap, 56, 62);
    assertEmptyBrick(mineMap, 65, 71);
    assertEmptyBrick(mineMap, 74, 80);
  });

  test("mine position in last row , and tips correct", () => {
    // Given
    const expectTips = {
      7: 2,
      16: 3,
      25: 3,
      34: 3,
      43: 3,
      52: 3,
      61: 3,
      70: 3,
      79: 2
    };
    const expectMinePosition = [8, 17, 26, 35, 44, 53, 62, 71, 80];
    mockRandom(expectMinePosition);

    // When
    const { mineMap, minePosition } = createMineMap(width, height, mine);

    // Then
    assertMapCorrect(mineMap, minePosition);
    assertMine(mineMap, minePosition, expectMinePosition);
    assertMapValue(mineMap, expectTips);
    assertEmptyBrick(mineMap, 0, 6);
    assertEmptyBrick(mineMap, 9, 15);
    assertEmptyBrick(mineMap, 18, 24);
    assertEmptyBrick(mineMap, 27, 33);
    assertEmptyBrick(mineMap, 36, 42);
    assertEmptyBrick(mineMap, 45, 51);
    assertEmptyBrick(mineMap, 54, 60);
    assertEmptyBrick(mineMap, 63, 69);
    assertEmptyBrick(mineMap, 72, 78);
  });
});
