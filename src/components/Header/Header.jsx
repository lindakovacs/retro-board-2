import React from 'react';
import PropTypes from 'prop-types';
import './Header.css';

function Header(props) {
  return (
    <nav>
      <div className="wrapper">
        <h1 className="logo-type">retro board</h1>
        <div className="layout">
          <h5>Layout</h5>
          <i 
            className={`fa fa-bars${props.layoutIsHorz ? "" : " active"}`}
            onClick={() => props.toggleLayout()}
          ></i>
          <i 
            className={`fa fa-bars layout-horz${props.layoutIsHorz ? " active" : ""}`}
            onClick={() => props.toggleLayout()}
          ></i>
        </div>
      </div>
    </nav>
  )
}

Header.propTypes = { 
  layoutIsHorz: PropTypes.bool.isRequired,
  toggleLayout: PropTypes.func.isRequired
};

export default Header