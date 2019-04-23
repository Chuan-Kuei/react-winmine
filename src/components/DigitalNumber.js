import React from "react";
import DigitalSign from "./DigitalSign.js";
import "./digitalNumber.css";

export default () => {
  return (
    <div styleName="container">
      <DigitalSign position="left-top" />
      <DigitalSign position="top" />
      <DigitalSign position="right-top" />
      <DigitalSign position="bottom" />
      <DigitalSign position="left-bottom" />
      <DigitalSign position="right-bottom" />
      <DigitalSign position="middle" />
    </div>
  );
};
