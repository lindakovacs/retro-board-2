import React from 'react';
import BuildCards from '../BuildCards/BuildCards'
import './BuildColumns.css';

// -- builds the card grid --
function BuildColumns(props) {
    // creates the categories array
    const categories = ["went-well", "to-improve", "action-items"];

    // -- checks the layout property and prepares the layout orientation css class --
    let columnClass = props.layoutIsHorz ? "column-3" : "column-1";

    // -- loops through the categories and creates 3 columns --
    return categories.map(currentCategory => {

      // creates the category title by modifying currentCategory 
      let catTitle = currentCategory.replace("-", " ").replace(/(^\w)|(\b\w)/g, char => char.toUpperCase());
      return (
        <div 
          className={columnClass + " " + currentCategory}
          id={currentCategory}
          key={currentCategory} 
        >
          {/* renders the category title & add button */}
          <h3>{catTitle}</h3>
          <button 
            className="btn-add-card"
            onClick={(e) => props.addCard(e, currentCategory)}
          >
            <span><b>+</b></span>
          </button>

          {/* Builds out the cards for each column */}
          <BuildCards 
            categories={categories}
            category={currentCategory}
            userInput={props.userInput}
            cards={props.cards}
            handleCommentChange={props.handleCommentChange}
            submitCard={props.submitCard}
            handleKeyDown={props.handleKeyDown}
            editCard={props.editCard}
            deleteCard={props.deleteCard}
            shiftCard={props.shiftCard}
            thumbsCounter={props.thumbsCounter}
          />
        </div>
      );
    });
}

export default BuildColumns