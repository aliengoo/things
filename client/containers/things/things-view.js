"use strict";

import React, {Component, PropTypes} from 'react';

import {connect} from 'react-redux';
import {getSocket} from '../../api/socket';

import {ContainerChangeAction} from '../actions/common-actions';

import ThingsConfig from './things-config';

/**
 * Root container
 */
export default class ThingsView extends Component {

  componentWillMount() {
    this.props.dispatch(ContainerChangeAction.create(ThingsConfig.container));
  }

  render() {
    return (
      <div>
        <header>
          <h1>Things View</h1>
        </header>
      </div>);
  }
}

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function select(state) {

  return {
    thingsFetching: state.thingsFetching,
    things: state.things,
    thingsFilter: state.thingsFilter,
    err: state.err
  };
}

export default connect(select)(ThingsView);