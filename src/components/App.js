import React from "react";
import Brick from "./Brick";
import "./app.css";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div styleName="winmine-app-container">
        <Brick />
      </div>
    );
  }
}
export default App;
