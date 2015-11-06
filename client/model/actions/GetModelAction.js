"use strict";

import {SocketModelAction} from './SocketModelAction';

export default class GetModelAction extends SocketModelAction {
  constructor(modelType) {
    super("GetModelAction", modelType);
  }
}


