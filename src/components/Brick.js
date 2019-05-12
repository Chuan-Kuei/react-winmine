import React from "react";
import "./brick.css";
const VALUE_STYLE_MAP = {
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight"
};

export default ({ broken, value }) => {
  let styleName = true ? "container broken " : "container ";
  const fontColorStyle = VALUE_STYLE_MAP[value] ? VALUE_STYLE_MAP[value] : "";
  styleName = styleName + fontColorStyle;
  return (
    <div styleName={styleName}>
      <span>{value}</span>
    </div>
  );
};
