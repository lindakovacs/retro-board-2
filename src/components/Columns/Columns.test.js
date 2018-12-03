import React from "react";
import { shallow } from "enzyme";
import { expect } from "chai";
import { spy } from "sinon";
import Columns from "./Columns";
import Cards from "../Cards/Cards";

describe("Columns component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Columns layoutIsHorz={true} addCard={addSpy} />);
  });

  // Tests for accurate rendering of three columns when layout is horizontal
  it("renders a 'wrapper' div with three columns", () => {
    expect(wrapper.find(".wrapper")).to.have.lengthOf(1);
    expect(wrapper.find(".column-3")).to.have.lengthOf(3);
  });

  // Tests for accurate rendering of one column when layout is vertical
  it("renders a 'wrapper' div with one column", () => {
    wrapper.setProps({
      layoutIsHorz: false
    });
    expect(wrapper.find(".wrapper")).to.have.lengthOf(1);
    expect(wrapper.find(".column-1")).to.have.lengthOf(3);
  });

  // Tests for accurate rendering of one column
  it("renders a column header with title and 'add' button", () => {
    const column1 = wrapper.find(".went-well");
    expect(
      column1.containsAllMatchingElements([
        <div className="column-3 went-well">
          <h3>Went Well</h3>
          <button className="btn-add-card">
            <span>
              <b>+</b>
            </span>
          </button>
          <Cards />
        </div>
      ])
    ).to.equal(true);
  });

  // Calls the intended callback function for add card button
  const addSpy = spy();
  it("calls addCard when add button is clicked", () => {
    const addButton = wrapper.find("button");
    addButton.at(0).simulate("click");
    expect(addSpy.calledOnce).to.equal(true);
  });
});
