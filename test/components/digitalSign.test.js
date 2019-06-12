import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";

import DigitalSign from "../../src/components/DigitalSign";

describe.only("DigitalSign", () => {
  test("render correctly", () => {
    const wrapper = renderer
      .create(<DigitalSign position="left-top" />)
      .toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  test("props active is true and has class active", () => {
    const wrapper = shallow(<DigitalSign position="left-top" active />);
    expect(wrapper.hasClass("active")).toBe(true);
    expect(wrapper.hasClass("left-top")).toBe(true);
  });

  test("props active is false and no has class active", () => {
    const wrapper = shallow(<DigitalSign position="left-top" />);
    expect(wrapper.hasClass("active")).toBe(false);
    expect(wrapper.hasClass("left-top")).toBe(true);
  });
});
