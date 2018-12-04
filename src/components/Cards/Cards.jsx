import React from 'react';
import PropTypes from 'prop-types';
import './Cards.css';

// -- loops through a category's cards in state and builds out a column --
function Cards(props) {
  const cards = props.cards;
  const categories = props.categories;

  // creates an array with only cards for the current category
  let thisColumnsCards = cards.filter(card => card.category === props.category);

  return thisColumnsCards.map(card => {
    if (card.isActive) { // checks whether card is active to select between two blocks of HTML...
      return (
        // this block builds an active card
        <div className="card card-active"
              key={props.category + "-" + card.id}>
          <form 
            id="went-well-form" 
            onSubmit={(e) => props.submitCard(e, card)}    
          > 
            <textarea   
              placeholder="Enter comment here." 
              id="went-well-text" 
              name="went-well-text" 
              rows="4"                                    
              value={props.userInput}           
              onChange={e => props.handleCommentChange(e.target.value)} 
              onKeyDown={e => props.handleKeyDown(e, card)}
            ></textarea> 
            <button type="submit">Submit</button>
            <i 
              className="far fa-trash-alt trash"
              title="Delete card"
              onClick={() => props.deleteCard(card)}   
            ></i>
          </form>
        </div> 
      );
    } else {
      return (
        <div 
          className="card"
          key={props.category + "-" + card.id}
        >
          <p>{card.text}</p> 
          <i 
            className="far fa-edit"
            title="Edit card"
            onClick={() => props.editCard(card.id)}
          ></i>
          <div className="thumbs-and-trash">
            <i 
              className="far fa-thumbs-up"
              title="Vote thumbs-up"
              onClick={() => props.thumbsCounter(true, card.id)}
            ></i>
            <b>{card.thumbsUp}</b>
            <i 
              className="far fa-thumbs-down"
              title="Vote thumbs-down"
              onClick={() => props.thumbsCounter(false, card.id)}
            ></i>
            <b>{card.thumbsDown}</b>
            <i 
              className="far fa-trash-alt trash"
              title="Delete card"
              onClick={() => props.deleteCard(card)}
            ></i>
          </div>
          <div className="shift-arrows">
            <i 
              className="fas fa-caret-left left"
              title="Shift card to previous category"
              onClick={() => props.shiftCard(card, card.category, categories, true)} 
            ></i>
            <i                      
              className="fas fa-caret-right right"
              title="Shift card to next category"
              onClick={() => props.shiftCard(card, card.category, categories, false)} 
            ></i>
          </div>
        </div> 
      );
    }
  });
}

Cards.propTypes = { 
  category: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired,
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

export default Cards;