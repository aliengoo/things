"use strict";

import {FetchStatus, SocketModelAction} from './SocketModelAction';
import ModelAction from  './ModelAction';

export default class GetModelAction extends SocketModelAction {
  constructor(modelType) {
    super("GetModelAction", modelType);
  }

  static containerModel(previousState = {}, action) {

    if (!ModelAction.isMatch(action, action.instance)) {
      return previousState;
    }

    let newState = {};

    switch(action.fetchStatus) {
      case FetchStatus.FETCHING:
        newState.fetching = true;
        newState.err = null;
        break;
      case FetchStatus.COMPLETE:
        newState.fetching = false;
        newState.previousModel = null;
        newState.currentModel = action.data;
        newState.err = null;
        break;
      case FetchStatus.FAILED:
        newState.fetching = false;
        newState.err = action.data;
        break;
    }

    return Object.assign({}, previousState, newState);
  }
}


