"use strict";

import AsyncStatus from '../api/async-status';

export function err(state = "", action) {

  if (action._asyncStatus === AsyncStatus.FAILED) {
    return action.data;
  }

  return state;
}