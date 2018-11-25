import React, { Component } from 'react';
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

  // -- adds a new active card to the bottom of a category - WITHOUT TRY CATCH BLOCK --
  addCard = (currentCategory) => {
    this.setState((state) => {
      if (state.cards.filter(card => card.isActive)[0]) { // issues an alert if an active card already exists
        alert("Please submit or close the active card before adding another card.");
      } else {
        let cards = state.cards;
        cards.push({ category: currentCategory, text: "", thumbsUp: 0, thumbsDown: 0, isActive: true, id: state.idCount });
        return {
          cards,
          idCount: ++state.idCount // prepares an ID for the next new card
        }}
    });
  }

  // -- submits newly created card upon pressing the Submit button  --
  submitCard = (e, card) => {
    e.preventDefault();
    this.setState((state) => {
      if (!state.userInput) { // issues an alert if comment box is empty
        alert("You must enter a valid comment.");
      } else {
        let cards = state.cards;
        let index = cards.indexOf(card);
        card.text = state.userInput; // sets card's text value to current userInput
        card.isActive = false; // changes card.isActive to false thus closing the open card
        cards[index] = card;
        return {
          cards,
          userInput: "" // resets userInput to an empty string in preparation for the next new card
        };
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
      if (state.cards.filter(card => card.isActive)[0]) { // issues an alert if an active card already exists
        alert("Please submit or close the active card before editing another card.");
      } else {
        let userInput;
        return {                          
          cards: state.cards.map(card => {  
            card.isActive = card.id===id || false ;  // changes inactive card to active  
            !(card.id===id) || (userInput = card.text);  // sets the textarea value to the card's text
            return card;                                  
          }),
          userInput
        }
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

export default App;
