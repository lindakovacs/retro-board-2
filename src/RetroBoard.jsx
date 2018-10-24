import React, { Component } from 'react';
import 'normalize.css';
import './RetroBoard.css';

// -- loops through a category's cards in state and builds out a column --
function BuildCards(props) {
  const categories = props.categories, category = props.category, catIndex = props.catIndex;
  let currentCards = props.cards.filter(card => card.category === props.category);
  return currentCards.map(card => {
    return (
      <div className="card">
        <p>{card.text}</p>
        <div className="icons">
          <i className="far fa-thumbs-up"></i>
          <b>{card.thumbsUp}</b>
          <i className="far fa-thumbs-down"></i>
          <b>{card.thumbsDown}</b>
          <i className="far fa-trash-alt trash"></i>
        </div>
        <div className="shift-arrows">
          <i 
            className="fas fa-caret-left left"
            isMovingLeft={true}
            onClick={(catIndex, true, categories)}
          ></i>
          <i className="fas fa-caret-right right"></i>
        </div>
      </div>
    );
  });
}

// -- builds the card grid --
function BuildBoard(props) {

  // -- checks the layout property and sets the layout orientation --
  let columnClass = props.layoutIsHorz ? "column-3" : "column-1";

  // -- loops through the categories and creates 3 columns --
  return props.categories.map(category => {
    let catTitle = category.replace("-", " ").replace(/(^\w)|(\b\w)/g, char => char.toUpperCase());
    return (
      <div 
        className={columnClass + " " + category}
        id={category}
        key={category} 
      >
        <h3>{catTitle}</h3>
        <button 
          className="btn-add-card"
          onClick={(category) => props.addCard(category)}
        >
          <span><b>+</b></span>
        </button>
        <BuildCards 
          categories={props.categories}
          category={category}
          catIndex={props.categories.indexOf(props.category)}
          cards={props.cards}
        />
      </div>
    );
  });
}

class RetroBoard extends Component {
  state = {
    layoutIsHorz: true,
    userInput: "",
    cards: [
      {category: "went-well", text: "Here's is a test comment.", thumbsUp: 0, thumbsDown: 0},
    ],
    newCard: null
  }

  // -- function to create a new card in state --
  addCard = (category) => {
    return this.setState({
      newCard: { category: category, text: "", thumbsUp: 0, thumbsDown: 0 }
    });
  }

  // -- function to submit newly created card  --
  submitCard = (category) => {
    return this.setState({
        cards: this.state.cards.push({ category, text: "", thumbsUp: 0, thumbsDown: 0 })
      });
  }

  // -- function to delete card  --
  deleteCard = (cardToDelete) => {
    return this.setState({
        cards: this.state.cards.filter(card => card !== cardToDelete)
      });
  }

  // -- function to shift card to left or right column  --
  shiftCard = (index, category, isMovingLeft, categories) => {
    let newCards = this.state.cards;
    let catIndex = categories.indexOf(category);
    newCards[catIndex].category = isMovingLeft ? 
      (categories[((index - 1) >= 0) ? (index - 1) : 3]) :
      (categories[((index + 1) <= 3) ? (index + 1) : 0]);
    return this.setState({
        cards: newCards
      });
  }

  // -- function to increase the count of a card's thumbs up or down property --
  counter = () => {
    return this.setState({
       
    });
  }

  // -- function to toggle between a horizontal or vertical layout --
  toggleLayout = () => {
    return this.setState({
      layoutIsHorz: !this.state.layoutIsHorz
    });
  }

  render() {
    return (
      <main>
        {/* -- logo bar and layout toggler -- */}
        <nav>
          <div className="wrapper">
            <h1 className="logo-type">retro board</h1>
            <div className="layout">
              <h5>Layout</h5>
              <i 
                className={`fa fa-bars + ${this.state.layoutIsHorz && "active"}`} 
                id="layout-horz" 
                onClick={() => this.toggleLayout()}
              ></i>
              <i 
                className={`fa fa-bars layout-vert + ${!this.state.layoutIsHorz && "active"}`} 
                id="layout-vert" 
                onClick={() => this.toggleLayout()}
              ></i>
            </div>
          </div>
        </nav>

        {/* -- flex container for categories -- */}
        <div className="wrapper flex-container">

          {/* -- grid layout -- */}
          <BuildBoard 
            categories={["went-well", "to-improve", "action-items"]}
            layoutIsHorz={this.state.layoutIsHorz}
            userInput={this.state.userInput}
            cards={this.state.cards}
            addCard={this.addCard.bind(this)}
            submitCard={this.submitCard.bind(this)}
            deleteCard={this.deleteCard.bind(this)}
            shiftCard={this.shiftCard.bind(this)}
            counter={this.counter.bind(this)}
          />
        </div>
      </main>
    );
  }
}

export default RetroBoard;
