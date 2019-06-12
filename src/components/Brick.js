import React from "react";
import PropTypes from "prop-types";

import "./brick.css";
const VALUE_STYLE_MAP = {
  "-2": "wrong_mine",
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

const Brick = ({
  broken,
  marked,
  wrong,
  onClick: handleBrickBroken,
  onContextMenu: handleAddFlag,
  value
}) => {
  const styles = ["container"];
  const valueShow = value === -1 || value === -2 ? "" : value;
  if (broken) {
    const fontColorStyle = VALUE_STYLE_MAP[value] ? VALUE_STYLE_MAP[value] : "";
    styles.push(fontColorStyle);
    styles.push("broken");
  }
  if (marked) {
    styles.push("flag");
  }
  if (wrong) {
    styles.push("wrong");
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

Brick.defaultProps = {
  broken: false,
  marked: false,
  wrong: false
};

Brick.propTypes = {
  broken: PropTypes.bool,
  marked: PropTypes.bool,
  wrong: PropTypes.bool,
  onClick: PropTypes.func,
  onContextMenu: PropTypes.func,
  value: PropTypes.number
};

export default Brick;
