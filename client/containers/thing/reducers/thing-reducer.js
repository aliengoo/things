"use strict";

import AsyncStatus from '../../../api/async-status';
import ThingConfig from '../thing-config';

import {
  GetThingAction,
  InitThingAction,
  SetThingPropertyAction,
  StartEditingThingAction,
  AbortEditingThingAction,
  CreateThingAction,
  UpdateThingAction,
  DeleteThingAction,
  DeleteThingActionBroadcastAction,
  UpdateThingActionBroadcastAction,
  CreateThingActionBroadcastAction
} from '../actions/thing-actions';

export function thing(state = null, action) {
  var newState = state;

  if (action.container === ThingConfig.container) {

    // not async operation
    if (!action._asyncStatus) {
      switch (action.type) {
        case InitThingAction.type:
          newState = {};
          break;
        case SetThingPropertyAction.type:
          let update = Object.assign({}, action.data);

          // for category, when different to previous state, reset type
          if (action.data.hasOwnProperty("category")) {
            if (action.data.category !== state.category) {
              update.type = "";
            }
          }

          newState = Object.assign({}, state || {}, update);
          break;
        case StartEditingThingAction.type:
          // TODO
          break;
        case AbortEditingThingAction.type:
          newState = Object.assign({}, action.data);
          break;
        case DeleteThingActionBroadcastAction.type:
          if (action.data.thing && action.data.thing._id === action.data.deletedId) {
            newState = null;
          }
          break;
        case UpdateThingActionBroadcastAction.type:
          if (action.data.thing && action.data.thing._id === action.data.updatedThing._id) {
            newState = Object.assign({}, action.data.updatedThing);
          }
          break;
      }
    } else if (action._asyncStatus === AsyncStatus.COMPLETE) {
      switch (action.type) {
        case  GetThingAction.type:
          newState = Object.assign({}, action.data);
          break;
        case CreateThingAction.type:
        case UpdateThingAction.type:
          newState = Object.assign({}, action.data);
          break;
        case DeleteThingAction.type:
          newState = null;
          break;
      }
    }
  }


  return newState;
}