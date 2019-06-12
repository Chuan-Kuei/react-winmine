import React from "react";
import PropTypes from "prop-types";

import DigitalNumber from "./DigitalNumber";
import "./digitalBoard.css";

const DigitalBoard = ({ value }) => {
  const absValue = Math.abs(value);
  const units = absValue % 10;
  const tens = ~~((absValue / 10) % 10);
  const hundreds = ~~((absValue / 100) % 10);

  return (
    <div styleName="container">
      <DigitalNumber value={hundreds} />
      <DigitalNumber value={tens} />
      <DigitalNumber value={units} />
    </div>
  );
};

DigitalBoard.defaultProps = {
  value: 0
};

DigitalBoard.propTypes = {
  value: PropTypes.number
};

export default DigitalBoard;
