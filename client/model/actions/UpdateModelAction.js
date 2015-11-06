"use strict";

import {SocketModelAction} from './SocketModelAction';

export default class UpdateModelAction extends SocketModelAction {
  constructor(modelType) {
    super("UpdateModelAction", modelType);
  }
}


