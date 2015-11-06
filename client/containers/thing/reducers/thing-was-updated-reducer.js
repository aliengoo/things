"use strict";

import FetchStatus from '../../../api/fetch-status';
import ThingConfig from '../thing-config';

import {
  UpdateThingActionBroadcastAction, // true
} from '../actions/thing-actions';

export function thingWasUpdated(state = false, action) {
  let newState = state;
  if (action.container === ThingConfig.container) {
    if (action.type === UpdateThingActionBroadcastAction.type) {
      if (action.data.thing && action.data.thing._id === action.data.updatedThing._id) {
        newState = true;
      }
    }
  }

  return newState;
}