import React from "react";
import PropTypes from "prop-types";

import "./statucBrick.css";

const StatusBrick = ({
  status,
  onClick: handleClick,
  onContextMenu: handleRightClick
}) => {
  return (
    <div
      styleName={`container ${status}`}
      onClick={handleClick}
      onContextMenu={handleRightClick}
    />
  );
};

StatusBrick.defaultProps = {
  status: "smile",
  onContextMenu: e => {
    e.preventDefault();
  }
};
StatusBrick.propTypes = {
  status: PropTypes.oneOf(["smile", "winner", "lost"]),
  onClick: PropTypes.func.isRequired,
  onContextMenu: PropTypes.func
};

export default StatusBrick;
