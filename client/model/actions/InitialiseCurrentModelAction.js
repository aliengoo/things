"use strict";

import ModelAction from './ModelAction';

const ActionType = "InitialiseCurrentModelAction";

export default class InitialiseCurrentModelAction extends ModelAction {
  constructor(modelType) {
    super(ActionType, modelType);
  }

  static containerModel(previousState = {}, action) {

    if (action.type !== ActionType) {
      return previousState;
    }

    let newState = {
      previousModel: null,
      currentModel: action.data
    };

    let x = Object.assign({}, previousState, newState);

    console.log(x);
    return x;
  }
}


