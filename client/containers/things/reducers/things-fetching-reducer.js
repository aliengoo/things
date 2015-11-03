"use strict";

import AsyncStatus from '../../../api/async-status';
import ThingsConfig from '../things-config';

export function thingsFetching(state = false, action) {
  var newState = state;

  if (action.container === ThingsConfig.container) {
    if (action._asyncStatus === AsyncStatus.FETCHING) {
      newState = true;
    }
  }

  return newState;
}
