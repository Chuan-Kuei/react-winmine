import React from "react";
import { shallow } from "enzyme";

import DigitalSign from "../../src/components/DigitalSign";

describe("DigitalSign", () => {
  test("test", () => {
    const wrapper = shallow(<DigitalSign position="left-top" />);
  });
});
