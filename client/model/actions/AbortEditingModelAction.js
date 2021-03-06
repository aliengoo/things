"use strict";

import ModelAction from './ModelAction';

const ActionType = "AbortEditingModelAction";

export default class AbortEditingModelAction extends ModelAction {
  constructor(modelType) {
    super(ActionType, modelType);
  }

  static containerModel(previousState = {}, action) {
    if (action.type !== ActionType) {
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


