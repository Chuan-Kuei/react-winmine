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
  timerTask: undefined
};
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
    this.timer = this.timer.bind(this);
    this.handleBrickBroken = this.handleBrickBroken.bind(this);
    this.handleReset = this.handleReset.bind(this);
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
      mineObj[position] = { isBroken: false, value };
      return mineObj;
    }, {});
  }

  handleBrickBroken(mine, e) {
    const { mineMap } = this.state;
    const { value } = mineMap[mine];
    mineMap[mine] = { ...mineMap[mine], isBroken: true };
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
        <Brick value="smile" showStyle onClick={this.handleReset} />
        <DigitalNumber value={hundreds} />
        <DigitalNumber value={tens} />
        <DigitalNumber value={ones} />
        {mineMap &&
          Object.keys(mineMap).map((m, index) => {
            const { value, isBroken } = mineMap[m];
            return (
              <Brick
                key={m + index}
                value={value}
                broken={isBroken}
                onClick={R.curryN(2, this.handleBrickBroken)(m)}
              />
            );
          })}
      </div>
    );
  }
}
export default App;
