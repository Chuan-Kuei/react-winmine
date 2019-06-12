import React from "react";
import PropTypes from "prop-types";

import "./digitalSign.css";

const DigitalSign = ({ position, active }) => {
  const isActive = active ? "active" : "";
  return <div styleName={`container ${position} ${isActive}`} />;
};

DigitalSign.defaultProps = {
  active: false
};

DigitalSign.propTypes = {
  position: PropTypes.oneOf([
    "left-top",
    "top",
    "right-top",
    "right-bottom",
    "bottom",
    "left-bottom",
    "middle"
  ]).isRequired,
  active: PropTypes.bool
};

export default DigitalSign;
