"use strict";

import AsyncStatus from '../../../api/async-status';
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
