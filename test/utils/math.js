const nativeMath = global.Math;

const setupMock = () => {
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

const clearMock = () => {
  global.Math = nativeMath;
};

module.exports = {
  setupMock,
  clearMock
};
