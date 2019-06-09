import createMineMap from "../../src/businessLogic/MineMap";
import math from "../utils/math";

describe("Create MineMap 9*9 and mine 9 ", () => {
  // Given
  const width = 9;
  const height = 9;
  const mapSize = width * height;
  const mine = 9;

  // When
  const { mineMap, minePosition } = createMineMap(width, height, mine);

  beforeAll(() => {
    math.setupMock();
  });

  afterAll(() => {
    math.clearMock();
  });

  test("create correct map", () => {
    // Then
    expect(mineMap).toHaveLength(width * height);
    expect(minePosition).toHaveLength(mine);
  });

  test("mine position 0~9 , and tips correct", () => {
    // Given
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
});
