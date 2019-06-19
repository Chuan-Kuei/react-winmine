import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";

import Brick from "../../src/components/Brick";

describe("Brick", () => {
  test("render correctly", () => {
    const wrapper = renderer.create(<Brick />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  test("props default css only container", () => {
    const wrapper = shallow(<Brick />);
    expect(wrapper.hasClass("container")).toBe(true);
    expect(wrapper.hasClass("danger")).toBe(false);
    expect(wrapper.hasClass("wrong")).toBe(false);
    expect(wrapper.hasClass("mine")).toBe(false);
    expect(wrapper.hasClass("flag")).toBe(false);
  });

  test("props danger is true, have container, danger class", () => {
    const wrapper = shallow(<Brick danger />);
    expect(wrapper.hasClass("container")).toBe(true);
    expect(wrapper.hasClass("danger")).toBe(true);
    expect(wrapper.hasClass("wrong")).toBe(false);
    expect(wrapper.hasClass("mine")).toBe(false);
    expect(wrapper.hasClass("flag")).toBe(false);
  });

  test("props danger and wrong is true, have container, danger, wrong class", () => {
    const wrapper = shallow(<Brick danger wrong />);
    expect(wrapper.hasClass("container")).toBe(true);
    expect(wrapper.hasClass("danger")).toBe(true);
    expect(wrapper.hasClass("wrong")).toBe(true);
    expect(wrapper.hasClass("mine")).toBe(false);
    expect(wrapper.hasClass("flag")).toBe(false);
  });

  test("props danger, wrong and marked is true, have container, danger, wrong and flag class", () => {
    const wrapper = shallow(<Brick danger wrong marked />);
    expect(wrapper.hasClass("container")).toBe(true);
    expect(wrapper.hasClass("danger")).toBe(true);
    expect(wrapper.hasClass("wrong")).toBe(true);
    expect(wrapper.hasClass("flag")).toBe(true);
    expect(wrapper.hasClass("mine")).toBe(false);
  });

  test("props broken is true and value is 6, have container, broken and six class, div have children span, textHtml is 6", () => {
    const wrapper = shallow(<Brick broken value={6} />);
    expect(wrapper.hasClass("container")).toBe(true);
    expect(wrapper.hasClass("broken")).toBe(true);
    expect(wrapper.hasClass("six")).toBe(true);
    expect(wrapper.exists("div > span")).toBe(true);
    expect(wrapper.find("div > span").text()).toBe("6");
  });

  test("props broken is false and value is 6, have container class, and div no children span", () => {
    const wrapper = shallow(<Brick value={6} />);
    expect(wrapper.hasClass("container")).toBe(true);
    expect(wrapper.hasClass("broken")).toBe(false);
    expect(wrapper.hasClass("six")).toBe(false);
    expect(wrapper.exists("div > span")).toBe(false);
  });

  test("props broken is true and value is 1, have container, broken, one class, div have children span", () => {
    const wrapper = shallow(<Brick value={1} broken />);
    expect(wrapper.hasClass("container")).toBe(true);
    expect(wrapper.hasClass("broken")).toBe(true);
    expect(wrapper.hasClass("one")).toBe(true);
    expect(wrapper.exists("div > span")).toBe(true);
    expect(wrapper.find("div > span").text()).toBe("1");
  });

  test("props broken is false and mine is true, have container class", () => {
    const wrapper = shallow(<Brick mine />);
    expect(wrapper.hasClass("container")).toBe(true);
    expect(wrapper.hasClass("broken")).toBe(false);
    expect(wrapper.hasClass("mine")).toBe(false);
  });

  test("props broken is true and mine is true, have container, broken and mine class", () => {
    const wrapper = shallow(<Brick mine broken />);
    expect(wrapper.hasClass("container")).toBe(true);
    expect(wrapper.hasClass("broken")).toBe(true);
    expect(wrapper.hasClass("mine")).toBe(true);
  });

  test("props is onClick, div have onClick props", () => {
    const expectFn = () => {
      console.log("test");
    };
    const wrapper = shallow(<Brick onClick={expectFn} />);
    expect(
      wrapper
        .find("div")
        .first()
        .prop("onClick")
    ).toEqual(expectFn);
  });

  test("props is onContextMenu, div have onContextMenu props", () => {
    const expectFn = () => {
      console.log("test");
    };
    const wrapper = shallow(<Brick onContextMenu={expectFn} />);
    expect(
      wrapper
        .find("div")
        .first()
        .prop("onContextMenu")
    ).toEqual(expectFn);
  });
});
