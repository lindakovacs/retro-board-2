import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'normalize.css';
import './App.css';
import Columns from './components/Columns/Columns';
import Header from './components/Header/Header';



class App extends Component {
  state = {
    layoutIsHorz: true,
    userInput: "",
    cards: [],
    idCount: 1
  }

  // -- adds a new active card to the bottom of a category  --
  addCard = (currentCategory) => {
    this.setState((state) => {
      try { 
        if (state.cards.filter(card => card.isActive)[0]) { // throws an error if an active card already exists
          throw new Error("Please submit or close the active card before adding another card.");
        }
        let cards = state.cards;
        cards.push({ category: currentCategory, text: "", thumbsUp: 0, thumbsDown: 0, isActive: true, id: state.idCount });
        return {
          cards,
          idCount: ++state.idCount // prepares an ID for the next new card
        }
      } catch(err) {
        alert(err.message);
      }
    });
  }

  //SIMPLIFIED WITH TRY-CATCH BLOCK
  // addCard = (currentCategory) => {
  //   try { 
  //     if (currentCategory) {
  //       throw new Error("darn");
  //     }
  //     return;
  //   } catch(err) {
  //     return err;
  //   }
  // }
  
  //SIMPLIFIED WITHOUT TRY-CATCH BLOCK
  // addCard = (currentCategory) => {
  //   if (currentCategory) {
  //     throw new Error("darn");
  //   }
  //   return;
  // }

  // -- submits newly created card upon pressing the Submit button  --
  submitCard = (e, card) => {
    e.preventDefault();
    this.setState((state) => {
      try {
        if (!state.userInput) { // throws an error if comment box is empty
          throw new Error("You must enter a valid Comment.");
        }
        let cards = state.cards;
        let index = cards.indexOf(card);
        card.text = state.userInput; // sets card's text value to current userInput
        card.isActive = false; // changes card.isActive to false thus closing the open card
        cards[index] = card;
        return {
          cards,
          userInput: "" // resets userInput to an empty string in preparation for the next new card
        };
      } catch(err) {
        return alert(err);
      }
    });
  }

  // -- submits newly created card upon pressing the Enter key --
  handleKeyDown = (e, card) => {
    if (e.keyCode === 13) return this.submitCard(e, card);
  }

  // -- edits a card's comment  --
  editCard = (id) => {
    this.setState((state) => {
      try { 
        if (state.cards.filter(card => card.isActive)[0]) { // throws an error if an active card already exists
          throw new Error("Please submit or close the active card before editing another card.");
        }
        let userInput;
        return {                          
          cards: state.cards.map(card => {  
            card.isActive = card.id===id || false ;  // changes inactive card to active  
            !(card.id===id) || (userInput = card.text);  // sets the textarea value to the card's text
            return card;                                  
          }),
          userInput
        }
      } catch(err) {
        return alert(err);
      }
    });
  }

  // -- sets the value of the onscreen comment textarea  --
  handleCommentChange = (userInput) => {
    this.setState({
      userInput
    });
  };

  // -- filters out cardToDelete from the cards array  --
  deleteCard = (cardToDelete) => {
    this.setState((state) => {
      return {
        cards: state.cards.filter(card => card !== cardToDelete),
        userInput: cardToDelete.isActive ? "" : state.userInput     // resets userInput to "" if cardToDelete is an active card
      }
    });
  }

   // -- shifts card to left or right column (and thus, category)  --
   shiftCard = (card, category, categories, isMovingLeft) => {
    this.setState((state) => {
      let cardIndex = state.cards.indexOf(card);
      let catIndex = categories.indexOf(category);            // checks isMovingLeft then reassigns the
      card.category = isMovingLeft ?                          // card's category by shifting its index value 
        (categories[(catIndex > 0) ? (catIndex - 1) : 2]) :   // in the categories array and assigning
        (categories[(catIndex < 2) ? (catIndex + 1) : 0]);    // the new category to the card
      state.cards[cardIndex] = card;
      return { cards: state.cards }
    });
  }

  // -- increases the count of a card's thumbs up or down property --
  thumbsCounter = (isThumbsUp, id) => {
    this.setState((state) => {
      return { 
        cards: state.cards.map(card => {  
          if (card.id===id && isThumbsUp) { ++card.thumbsUp; } // isolates a card and increments its thumbsUp counter
          if (card.id===id && !isThumbsUp) { ++card.thumbsDown; } // isolates a card and increments its thumbsDown counter
          return card;
        })
      }
    });
  }

  // -- toggles between a horizontal or vertical layout --
  toggleLayout = () => {
    this.setState((state) => {
      return { layoutIsHorz: !state.layoutIsHorz }
    });
  }

  render() {
    console.log(this.props);
    return (
      <main>
        <Header
          layoutIsHorz={this.state.layoutIsHorz}
          toggleLayout={this.toggleLayout}
        />
        <Columns 
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
      </main>
    );
  }
}

App.propTypes = { 
  layoutIsHorz: PropTypes.bool.isRequired,
  toggleLayout: PropTypes.func.isRequired, 
  userInput: PropTypes.string.isRequired,
  cards: PropTypes.array.isRequired,
  addCard: PropTypes.func.isRequired,
  handleCommentChange: PropTypes.func.isRequired,
  submitCard: PropTypes.func.isRequired,
  handleKeyDown: PropTypes.func.isRequired,
  editCard: PropTypes.func.isRequired,
  deleteCard: PropTypes.func.isRequired,
  shiftCard: PropTypes.func.isRequired,
  thumbsCounter: PropTypes.func.isRequired
};

export default App;
