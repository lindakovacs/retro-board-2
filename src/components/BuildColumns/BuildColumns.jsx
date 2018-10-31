import React from 'react';
import PropTypes from 'prop-types';
import BuildCards from '../BuildCards/BuildCards'
import './BuildColumns.css';

// -- builds the 3-column or 1-column template --
function BuildColumns(props) {
    const categories = ["went-well", "to-improve", "action-items"];

    // -- prepares the layout orientation css class --
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
          <h3>{catTitle}</h3>
          <button 
            className="btn-add-card"
            onClick={(e) => props.addCard(e, currentCategory)}
          >
            <span><b>+</b></span>
          </button>

          {/* Builds out the cards for each column */}
          <BuildCards 
            {...props}
            categories={categories}
            category={currentCategory}
          />
        </div>
      );
    });
}

BuildCards.propTypes = { 
  layoutIsHorz: PropTypes.bool.isRequired,
  categories: PropTypes.array.isRequired,
  addCard: PropTypes.func.isRequired,
};

export default BuildColumns