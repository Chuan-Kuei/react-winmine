import React from "react";
import WinMine from "react-winmine";
import "react-winmine/lib/react-winmine.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      level: "easy"
    };
    this.handleChangeLevel = this.handleChangeLevel.bind(this);
  }

  handleChangeLevel(e) {
    const { value: level } = e.target;
    this.setState({
      level
    });
  }

  render() {
    const { level } = this.state;
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
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
