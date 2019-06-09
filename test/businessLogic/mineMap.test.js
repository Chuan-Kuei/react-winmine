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
    expect(mineMap).toHaveLength(width * height);
    expect(minePosition).toHaveLength(mine);
  });

  test("mine position in first column , and tips correct", () => {
    // Given
    const expectMinePosition = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    mockRandom(expectMinePosition);
    const expectTipsFor9To17 = [2, 3, 3, 3, 3, 3, 3, 3, 2];

    // When
    const { mineMap, minePosition } = createMineMap(width, height, mine);

    // Then
    assertMapCorrect(mineMap, minePosition);
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

  test("mine position in last column , and tips correct", () => {
    // Given
    const expectMinePosition = [72, 73, 74, 75, 76, 77, 78, 79, 80];
    mockRandom(expectMinePosition);
    const expectTipsFor63To71 = [2, 3, 3, 3, 3, 3, 3, 3, 2];

    // When
    const { mineMap, minePosition } = createMineMap(width, height, mine);

    // Then
    assertMapCorrect(mineMap, minePosition);
    expect(minePosition).toEqual(expectMinePosition);
    for (let i = 72; i < 81; i++) {
      expect(mineMap[i]).toEqual(-1);
    }
    for (let i = 63; i <= 71; i++) {
      expect(mineMap[i]).toEqual(expectTipsFor63To71[i - 63]);
    }
    for (let i = 0; i < 63; i++) {
      expect(mineMap[i]).toEqual(0);
    }
  });

  test("mine position in first row , and tips correct", () => {
    // Given
    const expectMinePosition = [0, 9, 18, 27, 36, 45, 54, 63, 72];
    mockRandom(expectMinePosition);
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

    // When
    const { mineMap, minePosition } = createMineMap(width, height, mine);

    // Then
    assertMapCorrect(mineMap, minePosition);
    expect(minePosition).toEqual(expectMinePosition);
    expectMinePosition.forEach(m => {
      expect(mineMap[m]).toEqual(-1);
    });
    Object.keys(expectTips).forEach(tipPosition => {
      expect(mineMap[tipPosition]).toEqual(expectTips[tipPosition]);
    });
    const createArraySequence = (from, to) => {
      return Array.from(Array(to - from + 1).keys()).map(k => k + from);
    };
    const assertEmptyBrick = (from, to) => {
      const validatePosition = createArraySequence(from, to);
      Object.keys(validatePosition).forEach(n => {
        expect(mineMap[validatePosition[n]]).toEqual(0);
      });
    };
    assertEmptyBrick(2, 8);
    assertEmptyBrick(11, 17);
    assertEmptyBrick(20, 26);
    assertEmptyBrick(29, 35);
    assertEmptyBrick(38, 44);
    assertEmptyBrick(47, 53);
    assertEmptyBrick(56, 62);
    assertEmptyBrick(65, 71);
    assertEmptyBrick(74, 80);
  });

  test("mine position in last row , and tips correct", () => {
    // Given
    const expectMinePosition = [8, 17, 26, 35, 44, 53, 62, 71, 80];
    mockRandom(expectMinePosition);
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

    // When
    const { mineMap, minePosition } = createMineMap(width, height, mine);

    // Then
    assertMapCorrect(mineMap, minePosition);
    expect(minePosition).toEqual(expectMinePosition);
    expectMinePosition.forEach(m => {
      expect(mineMap[m]).toEqual(-1);
    });
    Object.keys(expectTips).forEach(tipPosition => {
      expect(mineMap[tipPosition]).toEqual(expectTips[tipPosition]);
    });
    const createArraySequence = (from, to) => {
      return Array.from(Array(to - from + 1).keys()).map(k => k + from);
    };
    const assertEmptyBrick = (from, to) => {
      const validatePosition = createArraySequence(from, to);
      Object.keys(validatePosition).forEach(n => {
        expect(mineMap[validatePosition[n]]).toEqual(0);
      });
    };
    assertEmptyBrick(0, 6);
    assertEmptyBrick(9, 15);
    assertEmptyBrick(18, 24);
    assertEmptyBrick(27, 33);
    assertEmptyBrick(36, 42);
    assertEmptyBrick(45, 51);
    assertEmptyBrick(54, 60);
    assertEmptyBrick(63, 69);
    assertEmptyBrick(72, 78);
  });
});
