"use strict";

import ModelAction from './ModelAction';

const ActionType = "BeginEditingModelAction";

export default class BeginEditingModelAction extends ModelAction {
  constructor(modelType) {
    super(ActionType, modelType);
  }

  static containerModel(previousState = {}, action) {

    if (action.type !== ActionType) {
      return previousState;
    }

    let newState = {
      editing: true,
      previousModel: Object.assign({}, action.data) // copy of current model
    };

    return Object.assign({}, previousState, newState);
  }
}


