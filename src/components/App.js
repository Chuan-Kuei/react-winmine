import React from "react";
import WinMine from "react-winmine";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      level: "easy"
    };
    this.handleChangeLevel = this.handleChangeLevel.bind(this);
  }

  handleChangeLevel(level) {
    this.setState({
      level
    });
  }

  render() {
    const { level } = this.state;
    return (
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-50%)"
        }}
      >
        <select value={level} onChange={this.handleChangeLevel}>
          <option value="easy">EASY</option>
          <option value="medium">MEDIUM</option>
          <option value="hard">HARD</option>
        </select>
        <WinMine level={level} />
      </div>
    );
  }
}
export default App;
