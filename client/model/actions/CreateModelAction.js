"use strict";

import {FetchStatus, SocketModelAction} from './SocketModelAction';

export default class CreateModelAction extends SocketModelAction {
  constructor(modelType) {
    super("CreateModelAction", modelType);
  }

  model(previousState = {}, action) {

    let newState = {};

    if (action.actionType !== this.actionType) {
      return previousState;
    }

    switch(action.asyncStatus) {
      case FetchStatus.FETCHING:
        newState.fetching = true;
        newState.err = null;
        break;
      case FetchStatus.COMPLETE:
        newState.fetching = false;
        newState.editing = false;
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



