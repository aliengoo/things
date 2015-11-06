"use strict";

import ModelAction from './ModelAction';

export default class ValidateModelPropertyAction extends ModelAction {
  constructor(modelType) {
    super("ValidateModelPropertyAction", modelType);
  }
}


