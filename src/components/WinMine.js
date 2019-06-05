import React from "react";
import PropTypes from "prop-types";
import * as R from "ramda";

import Brick from "./Brick";
import Const from "./Const";
import DigitalBoard from "./DigitalBoard";
import DigitalNumber from "./DigitalNumber";
import createMineMap from "../businessLogic/MineMap";
import "./winMine.css";
const LEVEL_MAP = {
  [Const.EASY]: {
    width: 9,
    height: 9,
    mine: 10
  },
  [Const.MEDIUM]: {
    width: 16,
    height: 16,
    mine: 40
  },
  [Const.HARD]: {
    width: 30,
    height: 16,
    mine: 99
  }
};
const defaultState = {
  time: 0,
  width: 9,
  height: 9,
  mine: 10,
  gameStatus: "smile",
  minePosition: [],
  flagPosition: [],
  brokenCount: 0,
  leftMine: 10,
  timerTask: undefined
};

class WinMine extends React.Component {
  constructor(props) {
    super(props);
    const { level } = props;
    const { width, height, mine } = LEVEL_MAP[level];
    this.state = {
      ...defaultState,
      width,
      height,
      mine,
      leftMine: mine
    };
    this.timer = this.timer.bind(this);
    this.handleBrickBroken = this.handleBrickBroken.bind(this);
    this.handleClickMine = this.handleClickMine.bind(this);
    this.handleAddFlag = this.handleAddFlag.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.breakBrickAround = this.breakBrickAround.bind(this);
    this.addFlags = this.addFlags.bind(this);
  }

  componentDidMount() {
    const { width, height, mine } = this.state;
    const { mineMap, minePosition } = createMineMap(width, height, mine);
    const timerTask = setInterval(this.timer, 1000);
    this.setState({
      timerTask,
      minePosition,
      mineMap: this.setMineMapAction(mineMap)
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

  setMineMapAction(mineMap) {
    return mineMap.reduce((mineObj, value, position) => {
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
    const {
      mineMap,
      gameStatus,
      brokenCount,
      minePosition,
      timerTask
    } = this.state;
    const { value, isMarked, isBroken } = mineMap[position];
    if (isMarked || isBroken || gameStatus === "lost") {
      return;
    }
    const waitingBroken = this.breakBrickAround([], position);
    waitingBroken.forEach(wb => {
      mineMap[wb] = { ...mineMap[wb], isBroken: true };
    });
    const isFinishGame = this.isFinishGame(brokenCount + waitingBroken.length);
    if (isFinishGame) {
      clearInterval(timerTask);
    }
    this.setState(
      {
        mineMap,
        brokenCount: brokenCount + waitingBroken.length,
        gameStatus: isFinishGame ? "winner" : gameStatus,
        timerTask: isFinishGame ? undefined : timerTask
      },
      () => {
        if (isFinishGame) {
          this.addFlags(minePosition, mineMap);
        }
      }
    );
  }

  isFinishGame(nextBrokenCount) {
    const { brokenCount, mine, width, height } = this.state;
    const totalBrick = width * height;
    return nextBrokenCount + mine === totalBrick;
  }

  handleClickMine(position, e) {
    const {
      mineMap,
      minePosition,
      gameStatus,
      flagPosition,
      timerTask
    } = this.state;
    if (mineMap[position]["isMarked"]) {
      return;
    }

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
    clearInterval(timerTask);
    this.setState({
      mineMap,
      timerTask: undefined,
      gameStatus: "lost"
    });
  }

  canBeBorken(waitingBroken, position) {
    const { mineMap } = this.state;
    if (
      !mineMap[position] ||
      (mineMap[position] && mineMap[position]["isBroken"]) ||
      (mineMap[position] && mineMap[position]["isMarked"]) ||
      waitingBroken.includes(position)
    ) {
      return false;
    }
    return true;
  }

  breakBrickAround(waitingBroken, position, forceBroken = false) {
    const { width, mineMap } = this.state;

    if (!this.canBeBorken(waitingBroken, position)) {
      return waitingBroken;
    }
    waitingBroken.push(position);

    if (
      (mineMap[position]["value"] === 0 && !mineMap[position]["isBroken"]) ||
      forceBroken
    ) {
      const isLeftBoundary = position % width === 0;
      const isRightBoundary = (position + 1) % width === 0;
      if (!isLeftBoundary) {
        this.breakBrickAround(waitingBroken, position - 1);
        this.breakBrickAround(waitingBroken, position - 1 + width);
        this.breakBrickAround(waitingBroken, position - 1 - width);
      }
      if (!isRightBoundary) {
        this.breakBrickAround(waitingBroken, position + 1);
        this.breakBrickAround(waitingBroken, position + 1 + width);
        this.breakBrickAround(waitingBroken, position + 1 - width);
      }
      this.breakBrickAround(waitingBroken, position - width);
      this.breakBrickAround(waitingBroken, position + width);
    }
    return waitingBroken;
  }

  addFlags(positions, mineMap) {
    const { minePosition } = this.state;
    positions.forEach(position => {
      mineMap[position] = { ...mineMap[position], isMarked: true };
    });
    const leftMine = minePosition.length - positions.length;
    this.setState({
      mineMap,
      leftMine,
      flagPosition: positions
    });
  }

  handleAddFlag(position, e) {
    const { mineMap, flagPosition, minePosition, gameStatus } = this.state;
    const { isBroken, isMarked } = mineMap[position];
    e.preventDefault();
    const flagSize = flagPosition.length;
    const mineSize = minePosition.length;
    if (
      isBroken ||
      (mineSize === flagSize && !isMarked) ||
      gameStatus !== "smile"
    ) {
      return;
    }
    mineMap[position] = { ...mineMap[position], isMarked: !isMarked };
    if (!isMarked) {
      flagPosition.push(position);
    } else {
      flagPosition.splice(flagPosition.indexOf(position), 1);
    }

    this.addFlags(flagPosition, mineMap);
  }

  handleReset() {
    let { timerTask, leftMine, width, height, mine } = this.state;
    const { mineMap, minePosition } = createMineMap(width, height, mine);

    if (!timerTask) {
      timerTask = setInterval(this.timer, 1000);
    }

    this.setState({
      ...defaultState,
      timerTask,
      mineMap: this.setMineMapAction(mineMap),
      leftMine,
      width,
      height,
      mine,
      minePosition,
      flagPosition: []
    });
  }

  render() {
    const { level } = this.props;
    const { time, mineMap, gameStatus, leftMine } = this.state;
    return (
      <div styleName="winmine-app-container">
        <div styleName="winmine-header">
          <DigitalBoard value={leftMine} />
          <Brick onClick={this.handleReset} status={gameStatus} />
          <DigitalBoard value={time} />
        </div>
        <div styleName={`brickContainer ${level}`}>
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

WinMine.defaultProps = {
  level: Const.EASY
};

WinMine.propTypes = {
  level: PropTypes.oneOf([Const.EASY, Const.MEDIUM, Const.HARD])
};

export default WinMine;
