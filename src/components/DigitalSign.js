import React from "react";
import PropTypes from "prop-types";

import "./digitalSign.css";

const DigitalSign = ({ position }) => {
  return <div styleName={`container ${position}`} />;
};

DigitalSign.propTypes = {
  position: PropTypes.string.isRequired
};

export default DigitalSign;
