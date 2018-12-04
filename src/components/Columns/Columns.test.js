import React from "react";
import { shallow } from "enzyme";
import { expect } from "chai";
import { spy } from "sinon";
import Columns from "./Columns";

describe("Columns component", () => {
  let wrapper;
  const dummySpy = spy();
  beforeEach(() => {
    wrapper = shallow(
    <Columns 
      layoutIsHorz={true} 
      addCard={addSpy} 
      categories={["went-well", "to-improve", "action-items"]}
      category="went-well"
      cards={[{category: "went-well", text: "test", thumbsUp: 0, thumbsDown: 0, isActive: false, id: 1}]}
      userInput="user input test"
      idCount={1}
      deleteCard={dummySpy}
      editCard={dummySpy}
      thumbsCounter={dummySpy}
      shiftCard={dummySpy}
      handleCommentChange={dummySpy}
      handleKeyDown={dummySpy}
      submitCard={dummySpy} 
      />
      );
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
  it("renders correct titles for all three columns", () => {
    const titles = wrapper.find("h3");
    expect(titles).to.have.lengthOf(3);
    expect(titles.at(0).text()).to.equal("Went Well");
    expect(titles.at(1).text()).to.equal("To Improve");
    expect(titles.at(2).text()).to.equal("Action Items");
  });

  // Calls the intended callback function for add card button
  const addSpy = spy();
  it("calls addCard when add button is clicked", () => {
    const addButton = wrapper.find("button");
    addButton.at(0).simulate("click");
    expect(addSpy.calledOnce).to.equal(true);
  });
});
