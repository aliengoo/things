"use strict";

import _ from 'lodash';

export default class ModelAction {
  constructor(type, modelType) {
    if (!_.isString(type)) {
      throw "ModelAction: type parameter was not a string";
    }

    if (!_.isString(modelType)) {
      throw "ModelAction: modelType parameter was not a string";
    }

    this.type = type;
    this.modelType = modelType;
    this.data = undefined;
  }

  // invoke inside dispatcher
  invoke(data) {
    return {
      type: this.type,
      instance: this,
      modelType: this.modelType,
      data
    };
  }
}




