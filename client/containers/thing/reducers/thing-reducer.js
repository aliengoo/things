"use strict";

import AsyncStatus from '../../../api/async-status';

import {
  GetThingAction,
  InitThingAction,
  SetThingNameAction,
  SetThingCategoryAction,
  SetThingTypeAction,
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
      switch(action.type) {
        case InitThingAction.type:
          newState = {};
          break;
        case SetThingCategoryAction.type:
          newState = Object.assign({}, state || {}, {
            category: action.data
          });
          break;
        case SetThingTypeAction.type:
          newState = Object.assign({}, state || {}, {
            type: action.data
          });
          break;
        case SetThingNameAction.type:
          newState = Object.assign({}, state || {}, {
            name: action.data
          });
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