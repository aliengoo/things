"use strict";

import ModelAction from './ModelAction';

export default class SetModelPropertyAction extends ModelAction {
  constructor(modelType) {
    super("SetModelPropertyAction", modelType);
  }
}


