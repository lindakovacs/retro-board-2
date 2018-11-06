import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { spy } from 'sinon';
import Header from './Header';

describe("Header component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <Header 
        layoutIsHorz={true}
        toggleLayout={togglerSpy}
      />
    );
  });

  // Tests for accurate rendering of header
  it("renders a header with a logo and layout toggler with horz bars active", () => {
    const column1 = wrapper.find('nav');
    expect(column1.containsAllMatchingElements([
        <nav>
          <div>
            <h1 className="logo-type">retro board</h1>
            <div className="layout">
              <h5>Layout</h5>
              <i className="fa fa-bars active"></i>
              <i className="fa fa-bars layout-vert"></i>
            </div>
          </div>
        </nav>
    ])).to.equal(true);
  });

  // Tests for accurate class assignation of layout toggler when vertical layout is selected
  it("renders the vertical layout button with the 'active' class", () => {
    wrapper.setProps({
      layoutIsHorz: false
    })
    expect(wrapper.find('.layout-vert').hasClass('active')).to.equal(true);
  });

  // Calls the intended callback function for layout toggler buttons
  const togglerSpy = spy();
  it("calls layoutToggler when add button is clicked", () => {
    const toggleIcons = wrapper.find('i');
    expect(toggleIcons).to.have.lengthOf(2);
    toggleIcons.at(0).simulate('click');
    expect(togglerSpy.calledOnce).to.equal(true);
    toggleIcons.at(1).simulate('click');
    expect(togglerSpy.calledTwice).to.equal(true);
  });
});