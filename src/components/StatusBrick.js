import React from "react";
import PropTypes from "prop-types";

import "./statucBrick.css";

const StatusBrick = ({ status, onClick: handleClick }) => {
  const handleRightClick = e => {
    e.preventDefault();
    return false;
  };
  return (
    <div
      styleName={`container ${status}`}
      onClick={handleClick}
      onContextMenu={handleRightClick}
    />
  );
};

StatusBrick.defaultProps = {
  status: "smile"
};
StatusBrick.propTypes = {
  status: PropTypes.oneOf(["smile", "winner", "lost"]),
  onClick: PropTypes.func
};

export default StatusBrick;
