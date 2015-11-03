"use strict";

import AsyncStatus from '../../../api/async-status';
import ThingConfig from '../thing-config';

import {
  DeleteThingActionBroadcastAction, // true
} from '../actions/thing-actions';

export function thingWasDeleted(state = false, action) {
  let newState = state;
  if (action.container === ThingConfig.container) {
    if (action.type === DeleteThingActionBroadcastAction.type) {
      if (action.data.thing && action.data.thing._id === action.data.deletedId) {
        newState = true;
      }
    }
  }

  return newState;
}