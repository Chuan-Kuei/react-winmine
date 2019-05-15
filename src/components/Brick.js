import React from "react";
import "./brick.css";
const VALUE_STYLE_MAP = {
  "-1": "mine",
  0: "zero",
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight"
};

const Brick = ({ broken = false, value, onClick: handleBrickBroken }) => {
  let styleName = broken ? "container broken " : "container ";
  const valueShow = value === -1 ? "*" : value;
  if (broken) {
    const fontColorStyle = VALUE_STYLE_MAP[value] ? VALUE_STYLE_MAP[value] : "";
    styleName = styleName + fontColorStyle;
  }
  return (
    <div styleName={styleName} onClick={handleBrickBroken}>
      {broken && <span>{valueShow}</span>}
    </div>
  );
};

export default Brick;
