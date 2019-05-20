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
  8: "eight",
  smile: "smile",
  flag: "flag"
};

const Brick = ({
  broken = false,
  marked = false,
  win = false,
  lost = false,
  onClick: handleBrickBroken,
  onContextMenu: handleAddFlag,
  value
}) => {
  const styles = ["container"];
  if (broken) {
    styles.push("broken");
  }
  const valueShow = value === -1 ? "" : value;
  if (broken) {
    const fontColorStyle = VALUE_STYLE_MAP[value] ? VALUE_STYLE_MAP[value] : "";
    styles.push(fontColorStyle);
  }
  if (marked) {
    styles.push("flag");
  }
  const styleName = styles.join(" ");
  return (
    <div
      styleName={styleName}
      onClick={handleBrickBroken}
      onContextMenu={handleAddFlag}
    >
      {broken && <span>{valueShow}</span>}
    </div>
  );
};

export default Brick;
