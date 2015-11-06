"use strict";

import ModelAction from './ModelAction';

export default class AbortEditingModelAction extends ModelAction {
  constructor(modelType) {
    super("AbortEditingModelAction", modelType);
  }

  model(previousState = {}, action) {

    let newState = {};

    if (action.actionType !== this.actionType) {
      return previousState;
    }

    newState.editing = false;
    newState.previousModel = null;
    newState.currentModel = action.data;

    return Object.assign({}, previousState, newState);
  }
}


