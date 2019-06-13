import React from "react";
import ReactDOM from "react-dom";
import WinMine from "./components/WinMine";

ReactDOM.render(<WinMine />, document.getElementById("app"));

if (module.hot) {
  module.hot.accept();
}
