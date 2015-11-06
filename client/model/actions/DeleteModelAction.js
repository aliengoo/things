"use strict";

import {FetchStatus, SocketModelAction} from './SocketModelAction';

export default class DeleteModelAction extends SocketModelAction {
  constructor(modelType) {
    super("DeleteModelAction", modelType);
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
        newState.previousModel = null;
        newState.currentModel = null;
        newState.deletedId = action.data;
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



