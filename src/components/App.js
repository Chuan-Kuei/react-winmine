import React from "react";
import Brick from "./Brick";
import DigitalNumber from "./digitalNumber";
import "./app.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0
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
    const { number } = this.state;
    const nextNumber = (number + 1) % 10;
    this.setState({ number: nextNumber });
  }

  render() {
    const { number } = this.state;
    return (
      <div styleName="winmine-app-container">
        <Brick />
        <DigitalNumber value={number} />
      </div>
    );
  }
}
export default App;
