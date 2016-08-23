'use strict';

/* eslint-env mocha */
/* eslint-disable react/prop-types */

import './setup';

import { expect } from 'chai';
import { mount } from 'enzyme';

import React  from 'react';
import Reflux from 'reflux';

import Refluxed from '../src/refluxed';

function BaseComp({ title, counter }) {
  return (
      <div>
        <h1>{title}</h1>
        <p>The count is {counter}</p>
      </div>
  );
}

describe('Refluxed', () => {
  let actions, counterStore, refluxedWrapper, baseCompWrapper;

  beforeEach(() => {
    actions = Reflux.createActions(['inc', 'dec']);
    counterStore = Reflux.createStore({
      listenables: actions,
      init() { this.count = 0; },
      getInitialState() { return this.count = 1; },
      onInc() { this.trigger(this.count += 1); },
      onDec() { this.trigger(this.count -= 1); }
    });

    const RefluxedComp = Refluxed(BaseComp, { counter: counterStore });
    refluxedWrapper = mount(<RefluxedComp title="hello"/>);
    baseCompWrapper = refluxedWrapper.find(BaseComp);
  });

  it('must load the initial state of a store', () => {
    expect(baseCompWrapper).to.have.prop('title', 'hello');
    expect(baseCompWrapper).to.have.prop('counter', 1);

    expect(refluxedWrapper.find('h1')).to.include.text('hello');
    expect(refluxedWrapper.find('p')).to.include.text('The count is 1');
  });

  it.skip('must respond to changes on the store', () => {
    actions.inc();

    expect(baseCompWrapper).to.have.prop('title', 'hello');
    expect(baseCompWrapper).to.have.prop('counter', 2);

    expect(refluxedWrapper.find('h1')).to.include.text('hello');
    expect(refluxedWrapper.find('p')).to.include.text('The count is 2');
  });
});