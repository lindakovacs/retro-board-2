import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import RetroBoard from './RetroBoard';

describe('RetroBoard component', () => {
  it('renders a header with logo and layout toggler', () => {
    const wrapper = shallow(<RetroBoard />);
    const header = wrapper.find('div.layout');
    // something
  });
});
