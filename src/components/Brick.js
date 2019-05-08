import React from "react";
import "./brick.css";

export default ({ broken, value }) => {
  let styleName = broken ? "container broken" : "container";

  return <div styleName={styleName} />;
};
