"use strict";

import FetchStatus from '../../../api/fetch-status';

import ThingConfig from '../thing-config';

export function thingFetching(state = false, action) {
  var newState = state;

  if (action.container === ThingConfig.container &&
    action.fetchStatus === FetchStatus.FETCHING) {
    newState = true;
  }

  return newState;
}