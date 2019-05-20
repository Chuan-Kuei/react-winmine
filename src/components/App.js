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
  timerTask: undefined
};
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
    this.timer = this.timer.bind(this);
    this.handleBrickBroken = this.handleBrickBroken.bind(this);
    this.handleAddFlag = this.handleAddFlag.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.brickBrokenAround = this.brickBrokenAround.bind(this);
    this.pushWaitingBroken = this.pushWaitingBroken.bind(this);
  }

  componentDidMount() {
    // const timerTask = setInterval(this.timer, 1000);
    const mineMap = this.getMineMap();
    this.setState({
      // timerTask,
      mineMap
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
    return mine.getMineMap().reduce((mineObj, value, position) => {
      mineObj[position] = { isBroken: false, isMarked: false, value };
      return mineObj;
    }, {});
  }

  handleBrickBroken(mine, e) {
    let { mineMap } = this.state;
    const { value, isMarked, isBroken } = mineMap[mine];
    if (isMarked || isBroken) {
      return;
    }
    if (value === 0) {
      mineMap = this.brickBrokenAround([mine], mineMap);
    }
    mineMap[mine] = { ...mineMap[mine], isBroken: true };

    this.setState({
      mineMap
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
        const isRightBoundary = (+b + 1) % width === 0;
        if (!isLeftBoundary) {
          this.pushWaitingBroken(waitingBroken, +b - 1, mineMap);
          this.pushWaitingBroken(waitingBroken, +b - 1 + width, mineMap);
          this.pushWaitingBroken(waitingBroken, +b - 1 - width, mineMap);
        }
        if (!isRightBoundary) {
          this.pushWaitingBroken(waitingBroken, +b + 1, mineMap);
          this.pushWaitingBroken(waitingBroken, +b + 1 + width, mineMap);
          this.pushWaitingBroken(waitingBroken, +b + 1 - width, mineMap);
        }
        this.pushWaitingBroken(waitingBroken, +b - width, mineMap);
        this.pushWaitingBroken(waitingBroken, +b + width, mineMap);
      } else {
        waitingBroken = R.without([b], waitingBroken);
      }
      mineMap[b] = { ...mineMap[b], isBroken: true };
    });
    return this.brickBrokenAround(waitingBroken, mineMap);
  }

  handleAddFlag(position, e) {
    const { mineMap } = this.state;
    const { isBroken, isMarked } = mineMap[position];
    e.preventDefault();

    if (isBroken) {
      return;
    }
    mineMap[position] = { ...mineMap[position], isMarked: !isMarked };
    this.setState({
      mineMap
    });
  }

  handleReset() {
    const mineMap = this.getMineMap();
    this.setState({
      mineMap
    });
  }

  render() {
    const { time, hundreds, tens, ones, mineMap } = this.state;
    return (
      <div styleName="winmine-app-container">
        <DigitalNumber value={0} />
        <DigitalNumber value={0} />
        <DigitalNumber value={0} />
        <Brick onClick={this.handleReset} smile />
        <DigitalNumber value={hundreds} />
        <DigitalNumber value={tens} />
        <DigitalNumber value={ones} />
        <div>
          {mineMap &&
            Object.keys(mineMap).map((m, index) => {
              const { value, isBroken, isMarked } = mineMap[m];
              return (
                <Brick
                  key={m + index}
                  value={value}
                  broken={isBroken}
                  marked={isMarked}
                  onClick={R.curryN(2, this.handleBrickBroken)(m)}
                  onContextMenu={R.curryN(2, this.handleAddFlag)(m)}
                />
              );
            })}
        </div>
      </div>
    );
  }
}
export default App;
