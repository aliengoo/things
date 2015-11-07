"use strict";

import ModelAction from './ModelAction';

export default class BeginEditingModelAction extends ModelAction {
  constructor(modelType) {
    super("BeginEditingModelAction", modelType);
  }

  static containerModel(previousState = {}, action) {

    if (!ModelAction.isMatch(action, action.instance)) {
      return previousState;
    }

    let newState = {
      editing: true,
      previousModel: Object.assign({}, action.data) // copy of current model
    };

    return Object.assign({}, previousState, newState);
  }
}


