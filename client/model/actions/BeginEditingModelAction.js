"use strict";

import ModelAction from './ModelAction';

export default class BeginEditingModelAction extends ModelAction {
  constructor(modelType) {
    super("BeginEditingModelAction", modelType);
  }

  model(previousState = {}, action) {

    let newState = {};

    if (action.actionType !== this.actionType) {
      return previousState;
    }

    newState.editing = true;
    newState.previousModel = action.data;

    return Object.assign({}, previousState, newState);
  }
}


