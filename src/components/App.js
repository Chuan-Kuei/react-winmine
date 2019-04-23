import React from "react";
import Brick from "./Brick";
import DigitalNumber from './digitalNumber';
import "./app.css";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div styleName="winmine-app-container">
        <Brick />
        <DigitalNumber />
      </div>
    );
  }
}
export default App;
