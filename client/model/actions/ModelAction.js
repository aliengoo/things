"use strict";

import _ from 'lodash';

export default class ModelAction {
  constructor(actionType, modelType) {
    if (!_.isString(actionType)) {
      throw "ModelAction: actionType parameter was not a string";
    }

    if (!_.isString(modelType)) {
      throw "ModelAction: modelType parameter was not a string";
    }

    this.actionType = actionType;
    this.modelType = modelType;
    this.data = undefined;
  }

  static isMatch(action1, action2) {
    return action1.actionType === action2.actionType &&
      action1.modelType === action2.modelType;
  }


  // invoke inside dispatcher
  invoke(data) {
    return {
      actionType: this.actionType,
      instance: this,
      modelType: this.modelType,
      data
    };
  }
}




