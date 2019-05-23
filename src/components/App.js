import React from "react";
import * as R from "ramda";
import Brick from "./Brick";
import DigitalNumber from "./digitalNumber";
import "./app.css";
import Mine from "../businessLogic/Mine";
const defaultState = {
  time: 0,
  hundreds: 0,
  tens: 0,
  ones: 0,
  width: 8,
  height: 8,
  gameStatus: "smile",
  minePosition: [],
  flagPosition: [],
  leftMine: {
    one: 0,
    ten: 1,
    hundred: 0
  },
  timerTask: undefined
};
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
    this.timer = this.timer.bind(this);
    this.handleBrickBroken = this.handleBrickBroken.bind(this);
    this.handleClickMine = this.handleClickMine.bind(this);
    this.handleAddFlag = this.handleAddFlag.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.brickBrokenAround = this.brickBrokenAround.bind(this);
    this.pushWaitingBroken = this.pushWaitingBroken.bind(this);
    this.mineMap;
  }

  componentDidMount() {
    // const timerTask = setInterval(this.timer, 1000);
    const mineMap = this.getMineMap();
    this.setState({
      // timerTask,
      mineMap,
      minePosition: this.mineMap.getMine()
    });
  }

  componentWillUnmount() {
    const { timerTask } = this.state;
    if (timerTask) {
      clearInterval(timerTask);
    }
  }

  timer() {
    const { time, timerTask } = this.state;
    const nextNumber = time + 1;
    this.setState({
      time: nextNumber,
      hundreds: ~~((nextNumber / 100) % 10),
      tens: ~~((nextNumber / 10) % 10),
      ones: nextNumber % 10
    });
  }

  getMineMap() {
    const mine = new Mine(8, 8, 10);
    mine.createMineMap();
    this.mineMap = mine;
    return mine.getMineMap().reduce((mineObj, value, position) => {
      const handleClick =
        value === -1 ? this.handleClickMine : this.handleBrickBroken;
      mineObj[position] = {
        isBroken: false,
        isMarked: false,
        hit: false,
        value,
        handleClick: R.curry(handleClick)(position),
        handleAddFlag: R.curry(this.handleAddFlag)(position)
      };
      return mineObj;
    }, {});
  }

  handleBrickBroken(position, e) {
    let { mineMap, gameStatus } = this.state;
    const { value, isMarked, isBroken } = mineMap[position];
    if (isMarked || isBroken || gameStatus === "lost") {
      return;
    }
    if (value === 0) {
      mineMap = this.brickBrokenAround([position], mineMap);
    }
    mineMap[position] = { ...mineMap[position], isBroken: true };
    this.setState({
      mineMap
    });
  }

  handleClickMine(position, e) {
    const { mineMap, minePosition, gameStatus, flagPosition } = this.state;
    if (gameStatus === "lost") {
      return;
    }
    minePosition.forEach(m => {
      if (!mineMap[m]["isMarked"]) {
        mineMap[m] = { ...mineMap[m], isBroken: true };
      }
    });
    mineMap[position] = { ...mineMap[position], isBroken: true, hit: true };
    const failFlags = R.without(minePosition, flagPosition);
    failFlags.forEach(failPosition => {
      mineMap[failPosition] = {
        ...mineMap[failPosition],
        value: -2,
        isBroken: true,
        isMarked: false
      };
    });
    this.setState({
      mineMap,
      gameStatus: "lost"
    });
  }

  pushWaitingBroken(waitingBroken, position, mineMap) {
    if (
      !mineMap[position] ||
      (mineMap[position] && mineMap[position]["isBroken"]) ||
      (mineMap[position] && mineMap[position]["isMarked"]) ||
      waitingBroken.includes(position)
    ) {
      return;
    }
    waitingBroken.push(position);
  }

  brickBrokenAround(waitingBroken, mineMap) {
    const { width } = this.state;
    if (waitingBroken.length === 0) {
      return mineMap;
    }
    waitingBroken.forEach(b => {
      if (mineMap[b]["value"] === 0 && !mineMap[b]["isBroken"]) {
        const isLeftBoundary = b % width === 0;
        const isRightBoundary = (b + 1) % width === 0;
        if (!isLeftBoundary) {
          this.pushWaitingBroken(waitingBroken, b - 1, mineMap);
          this.pushWaitingBroken(waitingBroken, b - 1 + width, mineMap);
          this.pushWaitingBroken(waitingBroken, b - 1 - width, mineMap);
        }
        if (!isRightBoundary) {
          this.pushWaitingBroken(waitingBroken, b + 1, mineMap);
          this.pushWaitingBroken(waitingBroken, b + 1 + width, mineMap);
          this.pushWaitingBroken(waitingBroken, b + 1 - width, mineMap);
        }
        this.pushWaitingBroken(waitingBroken, b - width, mineMap);
        this.pushWaitingBroken(waitingBroken, b + width, mineMap);
      } else {
        waitingBroken.splice(waitingBroken.indexOf(b), 1);
      }
      mineMap[b] = { ...mineMap[b], isBroken: true };
    });
    return this.brickBrokenAround(waitingBroken, mineMap);
  }

  handleAddFlag(position, e) {
    const { mineMap, flagPosition, minePosition } = this.state;
    const { isBroken, isMarked } = mineMap[position];
    e.preventDefault();
    const flagSize = flagPosition.length;
    const mineSize = minePosition.length;
    if (isBroken || (mineSize === flagSize && !isMarked)) {
      return;
    }
    mineMap[position] = { ...mineMap[position], isMarked: !isMarked };
    if (!isMarked) {
      flagPosition.push(position);
    } else {
      flagPosition.splice(flagPosition.indexOf(position), 1);
    }
    const leftMineCount = mineSize - flagPosition.length;

    this.setState({
      mineMap,
      flagPosition,
      leftMine: {
        one: leftMineCount % 10,
        ten: ~~((leftMineCount / 10) % 10),
        hundred: ~~((leftMineCount / 100) % 10)
      }
    });
  }

  handleReset() {
    const mineMap = this.getMineMap();
    this.setState({
      ...defaultState,
      mineMap,
      minePosition: this.mineMap.getMine(),
      flagPosition: []
    });
  }

  render() {
    const {
      time,
      hundreds,
      tens,
      ones,
      mineMap,
      gameStatus,
      leftMine
    } = this.state;
    const { one: lone, ten: lten, hundred: lhundred } = leftMine;
    return (
      <div styleName="winmine-app-container">
        <DigitalNumber value={lhundred} />
        <DigitalNumber value={lten} />
        <DigitalNumber value={lone} />
        <Brick onClick={this.handleReset} status={gameStatus} />
        <DigitalNumber value={hundreds} />
        <DigitalNumber value={tens} />
        <DigitalNumber value={ones} />
        <div>
          {mineMap &&
            Object.keys(mineMap).map((m, index) => {
              const {
                value,
                isBroken,
                isMarked,
                handleClick,
                hit,
                handleAddFlag
              } = mineMap[m];
              return (
                <Brick
                  key={m + index}
                  value={value}
                  broken={isBroken}
                  marked={isMarked}
                  onClick={handleClick}
                  hit={hit}
                  onContextMenu={handleAddFlag}
                />
              );
            })}
        </div>
      </div>
    );
  }
}
export default App;
