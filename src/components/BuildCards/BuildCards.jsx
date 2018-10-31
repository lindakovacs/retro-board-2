import React from 'react';
import PropTypes from 'prop-types';
import './BuildCards.css';

// -- loops through a category's cards in state and builds out a column --
function BuildCards(props) {
  const cards = props.cards;
  const categories = props.categories;

  // creates an array with only cards for the current category
  let thisColumnsCards = cards.filter(card => card.category === props.category);

  return thisColumnsCards.map(card => {
    return (
      card.isActive ? ( // checks value of card.isActive to select between two blocks of HTML...

        // this block builds an active card
        <div className="card card-active"                    // active card: the card is open and textarea is available
              key={props.category + "-" + card.id}>
          <form 
            id="went-well-form"                              // when the user clicks the Submit button or presses Enter 
            onSubmit={(e) => props.submitCard(e)}            // the card is no longer active and becomes uneditable
          > 
            <textarea   
              placeholder="Enter comment here." 
              id="went-well-text" 
              name="went-well-text" 
              rows="4"                                      // the textarea references state.userInput to populate
              value={props.userInput}                       // its value, while userInput is updated with onChange
              onChange={e => props.handleCommentChange(e)}  
              onKeyDown={e => props.handleKeyDown(e)}       // produces the same result as pressing the Submit button
            ></textarea> 
            <button type="submit">Submit</button>
            <i 
              className="far fa-trash-alt trash"
              onClick={e => props.deleteCard(e, card)}      // deletes the active card
            ></i>
          </form>
        </div> 

          ) : (

        // this block builds an inactive card
        <div 
          className="card"                                           // inactive card: the card is uneditable
          key={props.category + "-" + card.id}
        >
          <p>{card.text}</p> 
          <i 
            className="far fa-edit"
            onClick={e => props.editCard(e, card.id)}                // edits the comments of an inactive card
          ></i>
          <div className="thumbs-and-trash">
            <i 
              className="far fa-thumbs-up"
              onClick={e => props.thumbsCounter(e, true, card.id)}   // increments the cards thumbsUp counter
            ></i>
            <b>{card.thumbsUp}</b>
            <i 
              className="far fa-thumbs-down"
              onClick={e => props.thumbsCounter(e, false, card.id)}  // increments the cards thumbsDown counter
            ></i>
            <b>{card.thumbsDown}</b>
            <i 
              className="far fa-trash-alt trash"
              onClick={e => props.deleteCard(e, card)}               // deletes the inactive card
            ></i>
          </div>
          <div className="shift-arrows">
            <i 
              className="fas fa-caret-left left"                                                  // shifts a card to the 
              onClick={(e) => props.shiftCard(e, card.id, card.category, true, categories)}  // next category to the left
            ></i>
            <i 
              className="fas fa-caret-right right"                                                // shifts a card to the
              onClick={(e) => props.shiftCard(e, card.id, card.category, false, categories)} // next category to the right
            ></i>
          </div>
        </div> 
      )
    );
  });
}

BuildCards.propTypes = { 
  categories: PropTypes.array.isRequired,
  category: PropTypes.string.isRequired,
  userInput: PropTypes.string.isRequired,
  cards: PropTypes.array.isRequired, 
  handleCommentChange: PropTypes.func.isRequired,
  submitCard: PropTypes.func.isRequired,
  handleKeyDown: PropTypes.func.isRequired,
  editCard: PropTypes.func.isRequired,
  deleteCard: PropTypes.func.isRequired,
  shiftCard: PropTypes.func.isRequired,
  thumbsCounter: PropTypes.func.isRequired
};

export default BuildCards;