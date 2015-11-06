"use strict";

export default class ModelAction {
  constructor(actionType, modelType) {
    this.actionType = actionType;
    this.modelType = modelType;
    this.data = undefined;
  }

  // invoke inside dispatcher
  invoke(data) {
    return {
      actionType: this.actionType,
      modelType: this.modelType,
      data
    };
  }
}




