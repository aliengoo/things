"use strict";

import {FetchStatus} from '../model/actions/SocketModelAction';

export function err(state = "", action) {

  if (action.fetchStatus === FetchStatus.FAILED) {
    return action.data;
  }

  return state;
}