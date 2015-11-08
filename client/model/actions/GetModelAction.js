"use strict";

import {FetchStatus, SocketModelAction} from './SocketModelAction';

const ActionType = "GetModelAction";

export default class GetModelAction extends SocketModelAction {
  constructor(modelType) {
    super(ActionType, modelType);
  }

  static containerModel(previousState = {}, action) {

    if (action.type !== ActionType) {
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


