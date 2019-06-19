import React from "react";
import PropTypes from "prop-types";
import * as R from "ramda";

import Brick from "./Brick";
import StatusBrick from "./StatusBrick";

import Const from "./Const";
import DigitalBoard from "./DigitalBoard";
import DigitalNumber from "./DigitalNumber";
import createMineMap from "../businessLogic/mineMap";
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
  hundreds: 0,
  tens: 0,
  ones: 0,
  gameStatus: "smile",
  minePositions: [],
  flagPositions: [],
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
    const { mineMap, minePositions } = createMineMap(width, height, mine);
    const timerTask = setInterval(this.timer, 1000);
    this.setState({
      timerTask,
      minePositions,
      mineMap: this.setMineMapAction(mineMap)
    });
  }

  componentDidUpdate({ level: prevLevel }) {
    const { level } = this.props;
    if (level !== prevLevel) {
      const { timerTask } = this.state;
      const { width, height, mine } = LEVEL_MAP[level];
      const { mineMap, minePositions } = createMineMap(width, height, mine);
      this.setState({
        ...defaultState,
        minePositions,
        mineMap: this.setMineMapAction(mineMap),
        width,
        height,
        mine,
        leftMine: mine,
        timerTask
      });
    }
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
      const isMine = value === Const.MINE;
      const handleClick = isMine
        ? this.handleClickMine
        : this.handleBrickBroken;
      mineObj[position] = {
        isBroken: false,
        isMarked: false,
        danger: false,
        wrong: false,
        value: isMine ? 0 : value,
        mine: isMine,
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
      minePositions,
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
          this.addFlags(minePositions, mineMap);
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
      minePositions,
      gameStatus,
      flagPositions,
      timerTask
    } = this.state;
    if (mineMap[position]["isMarked"]) {
      return;
    }

    if (gameStatus === "lost") {
      return;
    }

    minePositions.forEach(mine => {
      if (!mineMap[mine]["isMarked"]) {
        mineMap[mine] = { ...mineMap[mine], isBroken: true };
      }
    });
    mineMap[position] = { ...mineMap[position], isBroken: true, danger: true };
    const failFlags = R.without(minePositions, flagPositions);
    failFlags.forEach(failPosition => {
      mineMap[failPosition] = {
        ...mineMap[failPosition],
        value: 0,
        isBroken: true,
        isMarked: false,
        mine: true,
        wrong: true
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
    const { minePositions } = this.state;
    positions.forEach(position => {
      mineMap[position] = { ...mineMap[position], isMarked: true };
    });
    const leftMine = minePositions.length - positions.length;
    this.setState({
      mineMap,
      leftMine,
      flagPositions: positions
    });
  }

  handleAddFlag(position, e) {
    e.preventDefault();
    const { mineMap, flagPositions, minePositions, gameStatus } = this.state;
    const { isBroken, isMarked } = mineMap[position];
    const flagSize = flagPositions.length;
    const mineSize = minePositions.length;
    if (
      isBroken ||
      (mineSize === flagSize && !isMarked) ||
      gameStatus !== "smile"
    ) {
      return;
    }
    mineMap[position] = { ...mineMap[position], isMarked: !isMarked };
    if (!isMarked) {
      flagPositions.push(position);
    } else {
      flagPositions.splice(flagPositions.indexOf(position), 1);
    }

    this.addFlags(flagPositions, mineMap);
  }

  handleReset() {
    let { timerTask, leftMine, width, height, mine } = this.state;
    const { mineMap, minePositions } = createMineMap(width, height, mine);

    if (!timerTask) {
      timerTask = setInterval(this.timer, 1000);
    }

    this.setState({
      ...defaultState,
      timerTask,
      mineMap: this.setMineMapAction(mineMap),
      leftMine: mine,
      width,
      height,
      mine,
      minePositions,
      flagPositions: []
    });
  }

  render() {
    const { level } = this.props;
    const { time, mineMap, gameStatus, leftMine } = this.state;
    return (
      <div styleName="winmine-app-container">
        <div styleName="winmine-header">
          <DigitalBoard value={leftMine} />
          <StatusBrick onClick={this.handleReset} status={gameStatus} />
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
                danger,
                mine,
                wrong,
                handleAddFlag
              } = mineMap[m];
              return (
                <Brick
                  key={m + index}
                  mine={mine}
                  value={value}
                  broken={isBroken}
                  marked={isMarked}
                  danger={danger}
                  wrong={wrong}
                  onClick={handleClick}
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
