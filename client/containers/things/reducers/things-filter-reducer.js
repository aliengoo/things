"use strict";

import FetchStatus from '../../../api/fetch-status';
import ThingsConfig from '../things-config';

export function thingsFilter(state = null, action) {
  var newState = state;

  if (action.container === ThingsConfig.container) {
    if (action.data) {
      newState = Object.assign({}, action.data);
    }
  }

  return newState;
}
