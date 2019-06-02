import React from "react";
import PropTypes from "prop-types";

import "./digitalSign.css";

const DigitalSign = ({ position, className }) => {
  return <div className={className} styleName={`container ${position}`} />;
};

DigitalSign.propTypes = {
  position: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default DigitalSign;
