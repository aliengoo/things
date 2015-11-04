"use strict";

import _ from 'lodash';
import AsyncStatus from '../../../api/async-status';
import ThingConfig from '../thing-config';

import {
  GetThingAction, // false
  InitThingAction, // true - a new thing was created, which means it's editable
  SetThingPropertyAction,
  StartEditingThingAction, // true - user has started editing
  AbortEditingThingAction, // false - the user aborted editing
  CreateThingAction, // true (when fetching or on fail), false (when complete)
  UpdateThingAction, // true (when fetching or on fail), false (when complete)
  DeleteThingAction, // false - you're not editing, your deleting
  DeleteThingActionBroadcastAction, // false if the deletedId matches the current thing being edited
  UpdateThingActionBroadcastAction, // default - if the thing has been edited by an external user, the content will be updated from source
  CreateThingActionBroadcastAction // default - somebody created something, but we don't care
} from '../actions/thing-actions';


export function thingIsBeingEdited(state = false, action) {

  let newState = state;

  if (action.container === ThingConfig.container) {

    if (!action._asyncStatus) {
      switch(action.type) {
        case DeleteThingActionBroadcastAction.type: // the active user cannot continue editing a deleted thing
          // test to see if whatever the current thing is is the thing that an external user has deleted
          if(action.data.thing && action.data.thing._id === action.data.deletedId) {
            newState = false;
          }
          break;
        case AbortEditingThingAction.type:
          newState = false;
          break;
        case SetThingPropertyAction.type:
        case StartEditingThingAction.type:
        case InitThingAction.type:
          newState = true;
          break;
      }
    } else if (action._asyncStatus === AsyncStatus.COMPLETE) {
      switch (action.type) {
        case CreateThingAction.type:
        case UpdateThingAction.type:
        case DeleteThingAction.type:
        case GetThingAction.type:
          newState = false;
          break;
      }
    } else if (action._asyncStatus === AsyncStatus.FETCHING || action._asyncStatus === AsyncStatus.FAILED) {
      // maintain edit status, even on fail - allows for retries
      switch (action.type) {
        case CreateThingAction.type:
        case UpdateThingAction.type:
          newState = true;
          break;
      }
    }
  } else {
    newState = false;
  }

  return newState;
}