"use strict";

import ModelAction from './ModelAction';

export default class AbortEditingModelAction extends ModelAction {
  constructor(modelType) {
    super("AbortEditingModelAction", modelType);
  }

  static containerModel(previousState = {}, action) {
    if (!ModelAction.isMatch(action, action.instance)) {
      return previousState;
    }

    let newState = {
      editing: false,
      previousModel: null,
      currentModel: action.data
    };

    return Object.assign({}, previousState, newState);
  }
}


