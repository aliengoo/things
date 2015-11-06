"use strict";

import ModelAction from './ModelAction';

export default class CreateModelBroadcastAction extends ModelAction {
  constructor(modelType) {
    super("CreateModelBroadcastAction", modelType);
  }
}




