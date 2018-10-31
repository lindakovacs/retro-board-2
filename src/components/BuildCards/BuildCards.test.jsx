import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import RetroBoard from '../../RetroBoard';
import BuildColumns from '.././BuildColumns';
import BuildCards from './BuildCards';

describe('BuildCards component', () => {
  it('renders an inactive card from stored state', () => {});
  it('inactive card: clicking edit icon makes card active', () => {});
  it('inactive card: clicking edit icon triggers an alert if another card is already open', () => {});
  it('inactive card: clicking thumbs-up icon increases counter by 1', () => {});
  it('inactive card: clicking thumbs-down icon increases counter by 1', () => {});
  it('inactive card: clicking left-arrow switches card category to left', () => {});
  it('inactive card: clicking right-arrow switches card category to right', () => {});
  it('renders an active card from stored stated', () => {});
  it('active card: text input renders in textarea on change', () => {});
  it('active card: clicking submit button makes the card inactive', () => {});
  it('active card: clicking submit button without text input triggers an alert', () => {});
  it('any card: clicking delete icon deletes the card', () => {});
});