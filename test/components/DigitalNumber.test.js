import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";

import DigitalNumber from "../../src/components/DigitalNumber";

describe("DigitalNumber", () => {
  test("render correctly", () => {
    const wrapper = renderer.create(<DigitalNumber />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  test("props value is 0", () => {
    const wrapper = shallow(<DigitalNumber value={0} />);
    const expectResults = [
      { position: "left-top", active: true },
      { position: "top", active: true },
      { position: "right-top", active: true },
      { position: "right-bottom", active: true },
      { position: "bottom", active: true },
      { position: "left-bottom", active: true },
      { position: "middle", active: false }
    ];
    assertDigitalSign(wrapper, expectResults);
  });

  test("props value is 1", () => {
    const wrapper = shallow(<DigitalNumber value={1} />);
    const expectResults = [
      { position: "left-top", active: false },
      { position: "top", active: false },
      { position: "right-top", active: true },
      { position: "right-bottom", active: true },
      { position: "bottom", active: false },
      { position: "left-bottom", active: false },
      { position: "middle", active: false }
    ];
    assertDigitalSign(wrapper, expectResults);
  });

  test("props value is 2", () => {
    const wrapper = shallow(<DigitalNumber value={2} />);
    const expectResults = [
      { position: "left-top", active: false },
      { position: "top", active: true },
      { position: "right-top", active: true },
      { position: "right-bottom", active: false },
      { position: "bottom", active: true },
      { position: "left-bottom", active: true },
      { position: "middle", active: true }
    ];
    assertDigitalSign(wrapper, expectResults);
  });

  test("props value is 3", () => {
    const wrapper = shallow(<DigitalNumber value={3} />);
    const expectResults = [
      { position: "left-top", active: false },
      { position: "top", active: true },
      { position: "right-top", active: true },
      { position: "right-bottom", active: true },
      { position: "bottom", active: true },
      { position: "left-bottom", active: false },
      { position: "middle", active: true }
    ];
    assertDigitalSign(wrapper, expectResults);
  });

  test("props value is 4", () => {
    const wrapper = shallow(<DigitalNumber value={4} />);
    const expectResults = [
      { position: "left-top", active: true },
      { position: "top", active: false },
      { position: "right-top", active: true },
      { position: "right-bottom", active: true },
      { position: "bottom", active: false },
      { position: "left-bottom", active: false },
      { position: "middle", active: true }
    ];
    assertDigitalSign(wrapper, expectResults);
  });

  test("props value is 5", () => {
    const wrapper = shallow(<DigitalNumber value={5} />);
    const expectResults = [
      { position: "left-top", active: true },
      { position: "top", active: true },
      { position: "right-top", active: false },
      { position: "right-bottom", active: true },
      { position: "bottom", active: true },
      { position: "left-bottom", active: false },
      { position: "middle", active: true }
    ];
    assertDigitalSign(wrapper, expectResults);
  });

  test("props value is 6", () => {
    const wrapper = shallow(<DigitalNumber value={6} />);
    const expectResults = [
      { position: "left-top", active: true },
      { position: "top", active: true },
      { position: "right-top", active: false },
      { position: "right-bottom", active: true },
      { position: "bottom", active: true },
      { position: "left-bottom", active: true },
      { position: "middle", active: true }
    ];
    assertDigitalSign(wrapper, expectResults);
  });

  test("props value is 7", () => {
    const wrapper = shallow(<DigitalNumber value={7} />);
    const expectResults = [
      { position: "left-top", active: true },
      { position: "top", active: true },
      { position: "right-top", active: true },
      { position: "right-bottom", active: true },
      { position: "bottom", active: false },
      { position: "left-bottom", active: false },
      { position: "middle", active: false }
    ];
    assertDigitalSign(wrapper, expectResults);
  });

  test("props value is 8", () => {
    const wrapper = shallow(<DigitalNumber value={8} />);
    const expectResults = [
      { position: "left-top", active: true },
      { position: "top", active: true },
      { position: "right-top", active: true },
      { position: "right-bottom", active: true },
      { position: "bottom", active: true },
      { position: "left-bottom", active: true },
      { position: "middle", active: true }
    ];
    assertDigitalSign(wrapper, expectResults);
  });

  test("props value is 9", () => {
    const wrapper = shallow(<DigitalNumber value={9} />);
    const expectResults = [
      { position: "left-top", active: true },
      { position: "top", active: true },
      { position: "right-top", active: true },
      { position: "right-bottom", active: true },
      { position: "bottom", active: true },
      { position: "left-bottom", active: false },
      { position: "middle", active: true }
    ];
    assertDigitalSign(wrapper, expectResults);
  });

  const assertDigitalSign = (wrapper, expectResults) => {
    expect(wrapper.find("DigitalSign")).toHaveLength(7);
    expectResults.forEach((expectResult, index) => {
      const DigitalSign = wrapper.find("DigitalSign");
      expect(DigitalSign.at(index).props()).toEqual(expectResult);
    });
  };
});
