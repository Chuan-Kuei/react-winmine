import React from "react";
import { shallow, mount } from "enzyme";
import renderer from "react-test-renderer";

import StatusBrick from "../../src/components/StatusBrick";

describe("StatusBrick", () => {
  const defaultOnclick = () => {};
  test("render correctly", () => {
    const wrapper = renderer
      .create(<StatusBrick onClick={defaultOnclick} />)
      .toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  test("props status is smile", () => {
    const wrapper = shallow(
      <StatusBrick status="smile" onClick={defaultOnclick} />
    );
    expect(wrapper.hasClass("container")).toBe(true);
    expect(wrapper.hasClass("smile")).toBe(true);
  });

  test("props status is lost", () => {
    const wrapper = shallow(
      <StatusBrick status="lost" onClick={defaultOnclick} />
    );
    expect(wrapper.hasClass("container")).toBe(true);
    expect(wrapper.hasClass("lost")).toBe(true);
  });

  test("props status is lost", () => {
    const wrapper = shallow(
      <StatusBrick status="lost" onClick={defaultOnclick} />
    );
    expect(wrapper.hasClass("container")).toBe(true);
    expect(wrapper.hasClass("lost")).toBe(true);
  });

  test("right click is preventDefault", () => {
    const wrapper = shallow(<StatusBrick onClick={defaultOnclick} />);
    const mockEvent = {
      preventDefault: jest.fn()
    };
    wrapper.find(".container").simulate("contextMenu", mockEvent);
    expect(mockEvent.preventDefault).toHaveBeenCalledTimes(1);
  });

  test("left click, click one times, and capture 1 time click", () => {
    const mockOnClick = jest.fn();
    const wrapper = shallow(<StatusBrick onClick={mockOnClick} />);
    wrapper.find(".container").simulate("click");
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
