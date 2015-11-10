"use strict";

import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react';
import {getSocket} from '../api/socket';

import ModelsActionBundler from './actions/ModelsActionBundler';

export default class ModelsContainer extends Component {

  applyFilter() {
    this.props
    this.FilterModelsAction.invoke();
  }

  setPage(selectedPage) {
    this.setPageAction.invoke(selectedPage);
  }

  openModel() {

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

