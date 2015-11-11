"use strict";

import ModelAction from './ModelAction';

const ActionType = "InitialiseCurrentModelAction";

export default class InitialiseCurrentModelAction extends ModelAction {
  constructor(modelType) {
    super(ActionType, modelType);
  }

  static containerModel(previousContainerModel = {}, action) {

    if (action.type !== ActionType) {
      return previousContainerModel;
    }

    let newState = {
      previousModel: null,
      currentModel: action.data
    };

    let x = Object.assign({}, previousContainerModel, newState);

    console.log(x);
    return x;
  }
}


