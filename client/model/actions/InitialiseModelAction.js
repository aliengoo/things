"use strict";

import ModelAction from './ModelAction';

export default class InitialiseModelAction extends ModelAction {
  constructor(modelType) {
    super("InitialiseModelAction", modelType);
  }

  static containerModel(previousState = {}, action) {

    if (!ModelAction.isMatch(action, action.instance)) {
      return previousState;
    }

    let newState = {
      editing: true,
      previousModel: null,
      currentModel: {},
      externalUpdate: false
    };

    return Object.assign({}, previousState, newState);
  }
}


