"use strict";

import FetchStatus from '../../../api/fetch-status';
import ThingsConfig from '../things-config';
import {FindThingsAction} from '../actions/things-actions';

export function thingsPage(state = null, action) {
  let newState = state;

  if (action.container === ThingsConfig.container &&
    action.fetchStatus === FetchStatus.COMPLETE &&
    action.type === FindThingsAction.type) {

    newState = Object.assign({}, action.data);
  }

  return newState;
}
