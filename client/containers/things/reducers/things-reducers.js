"use strict";

import _ from 'lodash';

import AsyncStatus from '../../../api/async-status';
import assign from 'object-assign';

import ThingsConfig from '../things-config';

export function thingsFilterFetching(state = false, action) {
  var newState = state;

  if (action.container === ThingsConfig.container) {
    if (action._asyncStatus === AsyncStatus.FETCHING) {
      newState = true;
    }
  }

  return newState;
}

export function thingsFilter(state = null, action) {
  var newState = state;

  if (action.container === ThingsConfig.container) {
    if (action.data) {
      newState = assign({}, action.data);
    }
  }

  return newState;
}

export function things(state = [], action) {
  var newState = state;

  if (action.container === ThingsConfig.container) {



    if (action.data) {
      newState = assign({}, action.data);
    }
  }

  return newState;
}