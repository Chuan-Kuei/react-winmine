import React from "react";
import Brick from "./Brick";
import DigitalNumber from "./digitalNumber";
import "./app.css";
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
  }

  componentDidMount() {
    const timerTask = setInterval(this.timer, 1000);
    this.setState({
      timerTask
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

  render() {
    const { time, hundreds, tens, ones } = this.state;
    return (
      <div styleName="winmine-app-container">
        <DigitalNumber value={0} />
        <DigitalNumber value={0} />
        <DigitalNumber value={0} />
        <Brick />
        <DigitalNumber value={hundreds} />
        <DigitalNumber value={tens} />
        <DigitalNumber value={ones} />
      </div>
    );
  }
}
export default App;
