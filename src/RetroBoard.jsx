import React, { Component } from 'react';
import 'normalize.css';
import './RetroBoard.css';
import BuildColumns from './components/BuildColumns/BuildColumns';



class RetroBoard extends Component {
  state = {
    layoutIsHorz: true,   // holds the current layout orientation value
    userInput: "",        // holds the current userInput for any active cards
    cards: [],            // holds an array of card objects
    idCount: 1            // holds the count which is used for assigning unique card IDs
  }

  // -- function to add a new active card to the bottom of a category  --
  addCard = (e, currentCategory) => {
    let newIdCount = this.state.idCount
    let newCards = this.state.cards.filter(card => card.isActive === false); // prevents multiple active cards being open simultaneously
    newCards.push({ category: currentCategory, text: "", thumbsUp: 0, thumbsDown: 0, isActive: true, id: newIdCount });
    return this.setState({
      cards: newCards,
      idCount: ++newIdCount // sets the idCount for the next new card
    });
  }

  // -- function to set the value of the onscreen comment textarea  --
  handleCommentChange = (e) => {
    return this.setState({
      userInput: e.target.value
    });
  };

  // -- function to submit newly created card upon pressing the Submit button  --
  submitCard = (e) => {
    e.preventDefault();
    try {
      if (!this.state.userInput) { // throws an error if comment box is empty
        throw new Error("You must enter a valid Comment.");
      }
      let newCards = this.state.cards;
      newCards[newCards.length-1].text = this.state.userInput; // sets card's text value to current userInput
      newCards[newCards.length-1].isActive = false; // changes card.isActive to false thus closing the open card
      return this.setState({
          cards: newCards,
          userInput: "" // resets userInput to an empty string in preparation for the next new card
        });
    } catch(err) {
      return alert(err);
    }
  }

  // -- function to submit newly created card upon pressing the Enter key --
  handleKeyDown = (e) => {
    if (e.keyCode === 13) return this.submitCard(e);
  }

  // -- function to edit card's comment  --
  editCard = (e, id) => {
    try {
      let newCards = this.state.cards, newUserInput; 
      if (newCards.filter(card => card.isActive)[0]) { // throws an error if an active card already exists
        throw new Error("Please submit or close the active card before editing another card.");
      }                              
      newCards = newCards.map(card => {  
        card.isActive = card.id===id || false ;       
        !card.id===id || (newUserInput = card.text);  
        return card;                                  
      });                                            
      return this.setState({                          
        cards: newCards,
        userInput: newUserInput
      });
    } catch(err) {
      return alert(err);
    }
  }

  // -- function to delete card  --
  deleteCard = (e, cardToDelete) => {
    e.preventDefault();
    let newUserInput = cardToDelete.isActive ? "" : this.state.userInput; // resets userInput to "" if cardToDelete is an active card
    let newCards = this.state.cards.filter(card => card !== cardToDelete); // filters out cardToDelete from the Cards array
    return this.setState({
        cards: newCards,
        userInput: newUserInput
      });
  }

  // -- function to shift card to left or right column  --
  shiftCard = (e, id, category, isMovingLeft, categories) => {
    let newCards = this.state.cards;
    let index = categories.indexOf(category); // finds the index of the card's category in categories array
    newCards.map(card => {
      if (card.id === id) { // isolates card by its ID
        return card.category = isMovingLeft ?               // checks isMovingLeft then reassigns the
          (categories[(index > 0) ? (index - 1) : 2]) :     // card's category by shifting its index value 
          (categories[(index < 2) ? (index + 1) : 0]);      // in the categories array and assigning
      } else return card;                                   // the new category to the card
    });
    return this.setState({
      cards: newCards
    });
  }

  // -- function to increase the count of a card's thumbs up or down property --
  thumbsCounter = (e, isThumbsUp, id) => {
    let newCards = this.state.cards.map(card => {  
      if (card.id===id && isThumbsUp) { ++card.thumbsUp; } // isolates a card and increments its thumbsUp counter
      if (card.id===id && !isThumbsUp) { ++card.thumbsDown; } // isolates a card and increments its thumbsDown counter
      return card;
    });
    return this.setState({ cards: newCards });
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
        {/* -- header bar and layout toggler -- */}
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
          <BuildColumns 
            layoutIsHorz={this.state.layoutIsHorz}
            userInput={this.state.userInput}
            cards={this.state.cards}
            addCard={this.addCard}
            handleCommentChange={this.handleCommentChange}
            submitCard={this.submitCard}
            handleKeyDown={this.handleKeyDown}
            editCard={this.editCard}
            deleteCard={this.deleteCard}
            shiftCard={this.shiftCard}
            thumbsCounter={this.thumbsCounter}
          />
        </div>
      </main>
    );
  }
}

export default RetroBoard;
