import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";

import DigitalBoard from "../../src/components/DigitalBoard";

describe("DigitalBoard", () => {
  test("render correctly", () => {
    const wrapper = renderer.create(<DigitalBoard />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  test("When value is 0 Then render 000 ", () => {
    const wrapper = shallow(<DigitalBoard value={0} />);
    assertDigitalNumberDisplay(wrapper, 0, 0, 0);
  });

  test("When value is 9 Then render 009 ", () => {
    const wrapper = shallow(<DigitalBoard value={9} />);
    assertDigitalNumberDisplay(wrapper, 0, 0, 9);
  });

  test("When value is 12 Then render 012 ", () => {
    const wrapper = shallow(<DigitalBoard value={12} />);
    assertDigitalNumberDisplay(wrapper, 0, 1, 2);
  });

  test("When value is 28 Then render 028 ", () => {
    const wrapper = shallow(<DigitalBoard value={28} />);
    assertDigitalNumberDisplay(wrapper, 0, 2, 8);
  });

  test("When value is 345 Then render 345 ", () => {
    const wrapper = shallow(<DigitalBoard value={345} />);
    assertDigitalNumberDisplay(wrapper, 3, 4, 5);
  });

  test("When value is 3675 Then render 675 ", () => {
    const wrapper = shallow(<DigitalBoard value={2675} />);
    assertDigitalNumberDisplay(wrapper, 6, 7, 5);
  });

  test("When value is 8071 Then render 071 ", () => {
    const wrapper = shallow(<DigitalBoard value={8071} />);
    assertDigitalNumberDisplay(wrapper, 0, 7, 1);
  });

  test("When value is -123 Then render 123 ", () => {
    const wrapper = shallow(<DigitalBoard value={-123} />);
    assertDigitalNumberDisplay(wrapper, 1, 2, 3);
  });

  const assertDigitalNumberDisplay = (wrapper, hundreds, tens, units) => {
    const expectResults = [hundreds, tens, units];
    const digitalNumbers = wrapper.find("DigitalNumber");

    expect(digitalNumbers).toHaveLength(3);
    expectResults.forEach((value, index) => {
      expect(digitalNumbers.at(index).props()).toEqual({ value });
    });
  };
});
