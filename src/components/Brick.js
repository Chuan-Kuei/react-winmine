import React from "react";
import classNames from "classNames";
import PropTypes from "prop-types";

import "./brick.css";
const VALUE_STYLE_MAP = {
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
  mine,
  danger,
  onClick: handleBrickBroken,
  onContextMenu: handleAddFlag,
  value
}) => {
  const fontColorStyle = VALUE_STYLE_MAP[value];
  const styleName = classNames({
    wrong,
    broken,
    danger,
    mine,
    flag: marked,
    container: true,
    [fontColorStyle]: broken
  });

  return (
    <div
      styleName={styleName}
      onClick={handleBrickBroken}
      onContextMenu={handleAddFlag}
    >
      {broken && <span>{value}</span>}
    </div>
  );
};

Brick.defaultProps = {
  broken: false,
  marked: false,
  wrong: false,
  danger: false
};

Brick.propTypes = {
  broken: PropTypes.bool,
  marked: PropTypes.bool,
  wrong: PropTypes.bool,
  mine: PropTypes.bool,
  danger: PropTypes.bool,
  onClick: PropTypes.func,
  onContextMenu: PropTypes.func,
  value: PropTypes.number
};

export default Brick;
