"use strict";

import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import ModelAction from '../../model/actions/ModelAction';

const ActionType = "SetPageAction";

export default class SetPageAction extends ModelAction {
  constructor(modelType) {
    super(ActionType, modelType);
  }

  static containerModel(previousContainerState = {}, action) {
    if (action.type !== ActionType) {
      return previousContainerState;
    }

    let newState = Object.assign({}, previousContainerState.filter, {
      page: Object.assign({}, previousContainerState.filter.page, {current: action.data})
    });

    return Object.assign({}, previousContainerState, newState);
  }
}


