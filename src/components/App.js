import React from "react";
import Brick from "./Brick";
import DigitalNumber from "./digitalNumber";
import "./app.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      firstTime: 0,
      secondTime: 0,
      thirdTime: 0
    };
    this.timer = this.timer.bind(this);
    this.timerTask;
  }

  componentDidMount() {
    this.timerTask = setInterval(this.timer, 1000);
  }

  componentWillMount() {
    if (this.timerTask) {
      clearInterval(this.timerTask);
    }
  }

  timer() {
    const { time } = this.state;
    const nextNumber = time + 1;

    this.setState({
      time: nextNumber,
      firstTime: ~~((nextNumber / 100) % 10),
      secondTime: ~~((nextNumber / 10) % 10),
      thirdTime: nextNumber % 10
    });
  }

  render() {
    const { time, firstTime, secondTime, thirdTime } = this.state;
    return (
      <div styleName="winmine-app-container">
        <DigitalNumber value={0} />
        <DigitalNumber value={0} />
        <DigitalNumber value={0} />
        <Brick />
        <DigitalNumber value={firstTime} />
        <DigitalNumber value={secondTime} />
        <DigitalNumber value={thirdTime} />
      </div>
    );
  }
}
export default App;
