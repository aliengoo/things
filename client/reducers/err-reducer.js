"use strict";

import FetchStatus from '../api/fetch-status';

export function err(state = "", action) {

  if (action.fetchStatus === FetchStatus.FAILED) {
    return action.data;
  }

  return state;
}