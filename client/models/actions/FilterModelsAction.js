"use strict";

import React, {Component, PropTypes} from 'react';
import {FetchStatus, SocketModelAction} from '../../model/actions/SocketModelAction';

const ActionType = "FilterModelsAction";

export default class FilterModelsAction extends SocketModelAction {
  constructor(modelType) {
    super(ActionType, modelType);
  }

  static containerModel(previousContainerModel = {}, action) {
    if (action.type !== ActionType) {
      return previousContainerModel;
    }

    let newState = {};

    switch(action.fetchStatus) {
      case FetchStatus.FETCHING:
        newState.fetching = true;
        break;
      case FetchStatus.COMPLETE:
        newState.fetching = false;
        newState.currentModels = action.data.results;
        newState.page = action.data.page;
        break;
      case FetchStatus.FAILED:
        newState.fetching = false;
        newState.err = action.data;
        break;
    }

    return Object.assign({}, previousContainerModel, newState);
  }

}
