import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { spy } from 'sinon';
import Cards from './Cards';

describe("Cards component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Cards 
        categories={["went-well", "to-improve", "action-items"]}
        category="went-well"
        cards={[{category: "went-well", text: "test", thumbsUp: 0, thumbsDown: 0, isActive: false, id: 1}]}
        userInput="user input test"
        idCount={1}
        deleteCard={deleteSpy}
        editCard={editSpy}
        thumbsCounter={thumbSpy}
        shiftCard={shiftSpy}
        handleCommentChange={commentSpy}
        handleKeyDown={keyDownSpy}
        submitCard={submitSpy}
      />
    );
  });

  // Tests for accurate card rendering

  it("renders an inactive card", () => {
    const inactiveCard = wrapper.find('.card');
    expect(inactiveCard.hasClass('card-active')).to.equal(false);
    expect(inactiveCard.containsAllMatchingElements([
        <p>test</p>,
        <i className="far fa-edit"/>,
        <i className="far fa-thumbs-up"/>,
        <b>{0}</b>,
        <i className="far fa-thumbs-down"/>,
        <i className="far fa-trash-alt trash"/>,
        <i className="fas fa-caret-left left"/>,
        <i className="fas fa-caret-right right"/>
    ])).to.equal(true);
  });
  it("renders an active card", () => {
    wrapper.setProps({
      cards: [{category: "went-well", text: "user input test", thumbsUp: 0, thumbsDown: 0, isActive: true, id: 1}]
    })
    const activeCard = wrapper.find('.card');
    expect(activeCard.hasClass('card-active')).to.equal(true);
    expect(activeCard.containsAllMatchingElements([
        <form>
          <textarea value="user input test"></textarea>
          <button>Submit</button>
          <i className="far fa-trash-alt trash"/>
        </form>
    ])).to.equal(true);
  });

  // Tests that buttons are calling intended callbacks on...

  // Inactive Cards:
  const editSpy = spy();
  it("calls editCard when edit icon is clicked", () => {
    const editIcon = wrapper.find('.fa-edit');
    editIcon.simulate('click');
    expect(editSpy.calledOnce).to.equal(true);
  });
  
  const thumbSpy = spy();
  it("calls thumbsCounter when thumbs-up icon is clicked", () => {
    const thumbsUpIcon = wrapper.find('.fa-thumbs-up');
    thumbsUpIcon.simulate('click');
    expect(thumbSpy.calledOnce).to.equal(true);
  });
  it("calls thumbsCounter when thumbs-down icon is clicked", () => {
    const thumbsDownIcon = wrapper.find('.fa-thumbs-down');
    thumbsDownIcon.simulate('click');
    expect(thumbSpy.calledTwice).to.equal(true);
  });
  
  const deleteSpy = spy();
  it("calls deleteCard when trash icon is clicked", () => {
    const deleteIcon = wrapper.find('.trash');
    deleteIcon.simulate('click');
    expect(deleteSpy.calledOnce).to.equal(true);
  });

  const shiftSpy = spy();
  it("calls shiftCard when left arrow is clicked", () => {
    const leftArrow = wrapper.find('.left');
    leftArrow.simulate('click');
    expect(shiftSpy.calledOnce).to.equal(true);
  });
  it("calls shiftCard when right arrow is clicked", () => {
    const rightArrow = wrapper.find('.right');
    rightArrow.simulate('click');
    expect(shiftSpy.calledTwice).to.equal(true);
  });

  // Active Cards:
  it("confirms the textarea form's button has type='submit'", () => {
    wrapper.setProps({
      cards: [{category: "went-well", text: "user input test", thumbsUp: 0, thumbsDown: 0, isActive: true, id: 1}]
    })
    const submitButton = wrapper.find('button');
    expect(submitButton.containsMatchingElement(<button type="submit">Submit</button>)).to.equal(true);
  });
  
  const submitSpy = spy();
  it("calls submitCard when onsubmit is activated by the form", () => {
    wrapper.setProps({
      cards: [{category: "went-well", text: "user input test", thumbsUp: 0, thumbsDown: 0, isActive: true, id: 1}]
    })
    const submitForm = wrapper.find('form');
    submitForm.simulate('submit');
    expect(submitSpy.calledOnce).to.equal(true);
  });
  
  const keyDownSpy = spy();
  it("calls handleKeyDown when enter key is pressed while user is typing a comment", () => {
    wrapper.setProps({
      cards: [{category: "went-well", text: "user input test", thumbsUp: 0, thumbsDown: 0, isActive: true, id: 1}]
    })
    const textBox = wrapper.find('textarea');
    textBox.simulate('keydown');
    expect(keyDownSpy.calledOnce).to.equal(true);
  });
  
  const commentSpy = spy();
  it("calls handleCommentChange when enter key is pressed while user is typing a comment", () => {
    wrapper.setProps({
      cards: [{category: "went-well", text: "user input test", thumbsUp: 0, thumbsDown: 0, isActive: true, id: 1}]
    })
    const textBox = wrapper.find('textarea');
    textBox.simulate('change', { target: { value: "user input test" } });
    expect(commentSpy.calledOnceWith("user input test")).to.equal(true);
  });
  
  it("calls deleteCard when trash icon is clicked", () => {
    wrapper.setProps({
      cards: [{category: "went-well", text: "user input test", thumbsUp: 0, thumbsDown: 0, isActive: true, id: 1}]
    })
    const deleteIcon = wrapper.find('.trash');
    deleteIcon.simulate('click');
    expect(deleteSpy.calledTwice).to.equal(true);
  });
});