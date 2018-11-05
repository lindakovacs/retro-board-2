import React from 'react';
// import PropTypes from 'prop-types';
import Cards from '../Cards/Cards'
import './Columns.css';

// -- builds the 3-column or 1-column template --
function Columns(props) {
  const categories = ["went-well", "to-improve", "action-items"];
  let columnClass = props.layoutIsHorz ? "column-3" : "column-1";
  return (
    <div className="wrapper flex-container">
      {categories.map(currentCategory => {
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
              onClick={() => props.addCard(currentCategory)}
            >
              <span><b>+</b></span>
            </button>

            <Cards 
              {...props}
              categories={categories}
              category={currentCategory}
            />
          </div>
        );
      })}
    </div>
  );
}

// Columns.propTypes = { 
//   // layoutIsHorz: PropTypes.bool.isRequired,
//   // addCard: PropTypes.func.isRequired,
//   // category: PropTypes.string.isRequired,
//   categories: PropTypes.array.isRequired
// };

export default Columns