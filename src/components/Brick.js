import React from "react";
import "./brick.css";
const VALUE_STYLE_MAP = {
  1: "#0302c5",
  2: "#217619",
  3: "#D31F27",
  4: "#060280",
  5: "#5D2217",
  6: "#147879",
  7: "#050505",
  8: "#808080"
};

export default ({ broken, value }) => {
  let styleName = true ? "container broken" : "container";
  const style = value !== 0 || value !== -1 ? VALUE_STYLE_MAP[value] : "";
  return (
    <div styleName={styleName}>
      <span>{1}</span>
    </div>
  );
};
