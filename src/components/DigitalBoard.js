import React from "react";
import PropTypes from "prop-types";

import DigitalNumber from "./DigitalNumber";
import "./digitalBoard.css";

const DigitalBoard = ({ value }) => {
  const one = value % 10;
  const ten = ~~((value / 10) % 10);
  const hundred = ~~((value / 100) % 10);

  return (
    <div styleName="container">
      <DigitalNumber value={hundred} />
      <DigitalNumber value={ten} />
      <DigitalNumber value={one} />
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
