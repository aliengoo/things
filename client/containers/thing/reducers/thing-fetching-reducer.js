"use strict";

import AsyncStatus from '../../../api/async-status';

import ThingConfig from '../thing-config';

export function thingFetching(state = false, action) {
  var newState = state;

  if (action.container === ThingConfig.container &&
    action._asyncStatus === AsyncStatus.FETCHING) {
    newState = true;
  }

  return newState;
}