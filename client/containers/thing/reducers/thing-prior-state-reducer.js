"use strict";

import _ from 'lodash';
import AsyncStatus from '../../../api/async-status';
import ThingConfig from '../thing-config';

import {
  GetThingAction, // null (when complete); otherwise default
  InitThingAction, // null, the user is creating a new instance
  SetThingPropertyAction, // default, the user is setting date on "thing"
  StartEditingThingAction, // the "thing"
  AbortEditingThingAction, // null - the user aborted editing, this "thingPriorState" is used to repop "thing"
  CreateThingAction, // null
  UpdateThingAction, // null (when complete); otherwise default
  DeleteThingAction, // null (when complete); otherwise default
  DeleteThingActionBroadcastAction, // if an external user deleted whatever the current user is editing, null
  UpdateThingActionBroadcastAction, // should be set to the new state sent by the server if the thing the user is editing has the same id
  CreateThingActionBroadcastAction // default - somebody created something, but we don't care
} from '../actions/thing-actions';

export function thingPriorState(state = null, action) {
  var newState = state;

  if (action.container === ThingConfig.container) {

    if (!action._asyncStatus) {
      switch(action.type) {
        case InitThingAction.type:
        case AbortEditingThingAction.type:
          newState = {};
          break;
        case StartEditingThingAction.type:
          // action creator should supply the thing as-is
          newState = Object.assign({}, action.data);
          break;
        case DeleteThingActionBroadcastAction.type:
          if (action.data.thing && action.data.thing._id  === action.data.deletedId) {
            // if this has been deleted, clear prior state out
            newState = null;
          }
          break;
        case UpdateThingActionBroadcastAction.type:
          if (action.data.thing && action.data.thing._id === action.data.updatedThing._id) {
            // if this has been update, reset prior state to whatever we're given in the response
            newState = Object.assign({}, action.data.updatedThing);
          }
      }
    } else {
      if (action._asyncStatus === AsyncStatus.COMPLETE) {
        switch (action.type) {
          case CreateThingAction.type:
          case UpdateThingAction.type:
          case DeleteThingAction.type:
          case GetThingAction.type:
            newState = null;
            break;
        }
      }
    }
  }

  return newState;
}