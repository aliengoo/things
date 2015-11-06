"use strict";

import ModelAction from './ModelAction';

export default class DeleteModelBroadcastAction extends ModelAction {
  constructor(modelType) {
    super("DeleteModelBroadcastAction", modelType);
  }
}




