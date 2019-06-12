import React from "react";
import PropTypes from "prop-types";

import DigitalSign from "./DigitalSign.js";
import "./digitalNumber.css";
const DIGITAL = {
  0: "1111110",
  1: "0011000",
  2: "0110111",
  3: "0111101",
  4: "1011001",
  5: "1101101",
  6: "1101111",
  7: "1111000",
  8: "1111111",
  9: "1111101"
};
const DIGITAL_POSITION = [
  "left-top",
  "top",
  "right-top",
  "right-bottom",
  "bottom",
  "left-bottom",
  "middle"
];

const DigitalNumber = ({ value }) => {
  const numberSign = DIGITAL[value];

  return (
    <div styleName="container">
      {DIGITAL_POSITION.map((position, index) => {
        const isActive = !!+numberSign[index];
        return (
          <DigitalSign key={position} position={position} active={isActive} />
        );
      })}
    </div>
  );
};

DigitalNumber.defaultProps = {
  value: 0
};

DigitalNumber.propTypes = {
  value: PropTypes.number
};

export default DigitalNumber;
