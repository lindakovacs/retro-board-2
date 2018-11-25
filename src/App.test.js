import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { stub } from 'sinon';
import App from './App';

describe('App component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow( <App /> );
  })

  // renders Header & Columns
  it("renders the nested components 'Header' and 'Columns'", () => {
    expect(wrapper.find('Header')).to.have.lengthOf(1);
    expect(wrapper.find('Columns')).to.have.lengthOf(1);
  });

  // tests addCard
  it("adds a new active card to state and increments the idCount by 1", () => {
    let columns = wrapper.find('Columns');
    columns.props().addCard("went-well");
    columns = wrapper.update().find('Columns');
    expect(columns.props().cards).to.deep.equal([{category: "went-well", text: "", thumbsUp: 0, thumbsDown: 0, isActive: true, id: 1}]);
    expect(wrapper.state().idCount).to.equal(2);
  });
  it("issues an alert message if another card is already active and doesn't add a second card", () => {
    const alertSpy = stub(window, 'alert');
    const card = {category: "went-well", text: "", thumbsUp: 0, thumbsDown: 0, isActive: true, id: 1};
    wrapper.setState({ cards: [card], userInput: "test" });
    let columns = wrapper.find('Columns');
    columns.props().addCard("went-well");
    alertSpy.restore();
    expect(alertSpy.calledOnceWith("Please submit or close the active card before adding another card.")).to.equal(true);
    expect(wrapper.state().cards.length).to.equal(1);
  });

  // tests submitCard
  it("converts an inactive card to an active card and resets userInput text to nothing", () => {
    const e = { preventDefault: () => {} };
    const card = {category: "went-well", text: "", thumbsUp: 0, thumbsDown: 0, isActive: true, id: 1};
    wrapper.setState({ cards: [card], userInput: "test" });
    let columns = wrapper.find('Columns');
    columns.props().submitCard(e, columns.props().cards[0]);
    columns = wrapper.update().find('Columns');
    expect(columns.props().cards).to.deep.equal([{category: "went-well", text: "test", thumbsUp: 0, thumbsDown: 0, isActive: false, id: 1}]);
    expect(columns.props().userInput).to.equal("");
  });
  it("issues an alert message if the user didn't input any text upon submission and doesn't make the card inactive", () => {
    const e = { preventDefault: () => {} };
    const alertSpy = stub(window, 'alert');
    const card = {category: "went-well", text: "", thumbsUp: 0, thumbsDown: 0, isActive: true, id: 1};
    wrapper.setState({ cards: [card]});
    let columns = wrapper.find('Columns');
    columns.props().submitCard(e, columns.props().cards[0]);
    alertSpy.restore();
    expect(alertSpy.calledOnceWith("You must enter a valid comment.")).to.equal(true);
    expect(wrapper.state().cards[0].isActive).to.equal(true);
  });

  // tests handleKeyDown
  it("produces same result as submitCard when 'Enter' key is pressed", () => {
    const e = { keyCode: 13, preventDefault: () => {} };
    const card = {category: "went-well", text: "", thumbsUp: 0, thumbsDown: 0, isActive: true, id: 1};
    wrapper.setState({ cards: [card], userInput: "test", idCount: 2 });
    let columns = wrapper.find('Columns');
    columns.props().handleKeyDown(e, columns.props().cards[0]);
    columns = wrapper.update().find('Columns');
    expect(columns.props().cards).to.deep.equal([{category: "went-well", text: "test", thumbsUp: 0, thumbsDown: 0, isActive: false, id: 1}]);
    expect(columns.props().userInput).to.equal("");
  });

  // tests editCard
  it("changes a card's status to 'active' and sets state.userInput to the card's text", () => {
    const card = {category: "went-well", text: "test", thumbsUp: 0, thumbsDown: 0, isActive: false, id: 1};
    wrapper.setState({ cards: [card], idCount: 2 });
    let columns = wrapper.find('Columns');
    columns.props().editCard(columns.props().cards[0].id);
    columns = wrapper.update().find('Columns');
    expect(columns.props().cards).to.deep.equal([{category: "went-well", text: "test", thumbsUp: 0, thumbsDown: 0, isActive: true, id: 1}]);
    expect(columns.props().userInput).to.equal("test");
  });
  it("issues an alert message if another card is already active, and doesn't activate a second card", () => {
    const alertSpy = stub(window, 'alert');
    const card = {category: "went-well", text: "", thumbsUp: 0, thumbsDown: 0, isActive: true, id: 1};
    wrapper.setState({ cards: [card], userInput: "test" });
    let columns = wrapper.find('Columns');
    columns.props().editCard(1);
    alertSpy.restore();
    expect(alertSpy.calledOnceWith("Please submit or close the active card before editing another card.")).to.equal(true);
    expect(wrapper.state().cards.length).to.equal(1);
  });

  // tests handleCommentChange
  it("sets state.userInput to the the argument value", () => {
    let columns = wrapper.find('Columns');
    columns.props().handleCommentChange("test");
    columns = wrapper.update().find('Columns');
    expect(columns.props().userInput).to.equal("test");
  });

  // tests deleteCard
  it("deletes a card from state.cards", () => {
    const card = {category: "went-well", text: "test", thumbsUp: 0, thumbsDown: 0, isActive: false, id: 1};
    wrapper.setState({ cards: [card], idCount: 2 });
    let columns = wrapper.find('Columns');
    columns.props().deleteCard(columns.props().cards[0]);
    columns = wrapper.update().find('Columns');
    expect(columns.props().cards).to.deep.equal([]);
  });

  // tests shiftCard (left arrow button)
  it("shifts a card's category to the left", () => {
    const categories = ["went-well", "to-improve", "action-items"];
    const card = {category: "went-well", text: "test", thumbsUp: 0, thumbsDown: 0, isActive: false, id: 1};
    wrapper.setState({ cards: [card], idCount: 2 });
    let columns = wrapper.find('Columns');
    columns.props().shiftCard(columns.props().cards[0], "went-well", categories, true );
    columns = wrapper.update().find('Columns');
    expect(columns.props().cards).to.deep.equal([{category: "action-items", text: "test", thumbsUp: 0, thumbsDown: 0, isActive: false, id: 1}]);
  });

  // tests shiftCard (right arrow button)
  it("shifts a card's category to the right", () => {
    const categories = ["went-well", "to-improve", "action-items"];
    const card = {category: "went-well", text: "test", thumbsUp: 0, thumbsDown: 0, isActive: false, id: 1};
    wrapper.setState({ cards: [card], idCount: 2 });
    let columns = wrapper.find('Columns');
    columns.props().shiftCard(columns.props().cards[0], "went-well", categories, false );
    columns = wrapper.update().find('Columns');
    expect(columns.props().cards).to.deep.equal([{category: "to-improve", text: "test", thumbsUp: 0, thumbsDown: 0, isActive: false, id: 1}]);
  });

  // tests thumbsCounter
  it("increments a card's thumbsUp or thumbsDown counter by 1", () => {
    const card = {category: "went-well", text: "test", thumbsUp: 0, thumbsDown: 0, isActive: false, id: 1};
    wrapper.setState({ cards: [card], idCount: 2 });
    let columns = wrapper.find('Columns');
    columns.props().thumbsCounter(true, columns.props().cards[0].id);
    columns.props().thumbsCounter(false, columns.props().cards[0].id);
    columns = wrapper.update().find('Columns');
    expect(columns.props().cards).to.deep.equal([{category: "went-well", text: "test", thumbsUp: 1, thumbsDown: 1, isActive: false, id: 1}]);
  });

  // tests toggleLayout
  it("toggles the boolean for state.layoutIsHorz", () => {
    let header = wrapper.find('Header');
    header.props().toggleLayout();
    header = wrapper.update().find('Header');
    expect(header.props().layoutIsHorz).to.equal(false);
    header.props().toggleLayout();
    header = wrapper.update().find('Header');
    expect(header.props().layoutIsHorz).to.equal(true);
  });
});
