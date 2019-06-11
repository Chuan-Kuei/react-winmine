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
  position: PropTypes.string.isRequired,
  active: PropTypes.bool
};

export default DigitalSign;
