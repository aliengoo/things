"use strict";

import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react';
import {getSocket} from '../api/socket';

import ModelsActionBundler from './actions/ModelsActionBundler';

export default class ModelsContainer extends Component {

  applyFilter() {
    const {filter, page} = this.props.containerModel;
    this.ApplyFilterAction.invoke();
  }

  setPage(selectedPage) {
    const {filter} = this.props.containerModel;
    this.SetPageAction.invoke(selectedPage);
    this.ApplyFilterAction.invoke(filter);
  }

  componentWillMount() {
    // initialise the actions, and bind the actions to the ModelContainer
    let actions = ModelsActionBundler.bundle(this.props.containerModel.modelType);
    let self = this;

    for (let key in actions) {
      if (actions.hasOwnProperty(key)) {
        self[key] = actions[key];
      }
    }
  }

  render() {

  }
}

ModelsContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  containerModel: PropTypes.object.isRequired
};

