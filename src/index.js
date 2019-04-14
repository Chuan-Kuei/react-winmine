import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
const title = "My Minimal React Webpack Babel Setup";

ReactDOM.render(<App />, document.getElementById("app"));

if (module.hot) {
  module.hot.accept();
}
