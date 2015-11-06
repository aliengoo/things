"use strict";

import FetchStatus from '../../../api/fetch-status';
import ThingsConfig from '../things-config';

export function thingsFetching(state = false, action) {
  var newState = state;

  if (action.container === ThingsConfig.container) {
    if (action.fetchStatus === FetchStatus.FETCHING) {
      newState = true;
    }
  }

  return newState;
}
