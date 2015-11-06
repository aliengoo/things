"use strict";

import FetchStatus from '../../../api/fetch-status';
import ThingConfig from '../thing-config';
import {
  AbortEditingThingAction,
  CreateThingAction,
  DeleteThingAction,
  DeleteThingActionBroadcastAction,
  GetThingAction,
  InitThingAction,
  SetThingFormPropertyValidityAction,
  SetThingPropertyAction,
  StartEditingThingAction,
  UpdateThingAction,
  UpdateThingActionBroadcastAction
} from '../actions/thing-actions';

export function thingFormState(state = null, action) {
  let newState = state;

  if (action.container === ThingConfig.container) {

    if (!action.fetchStatus) {
      switch (action.type) {
        // When aborting, reset the form state
        case AbortEditingThingAction.type:
          newState = {};
          break;
        // When external delete occurs on the currently viewed action, reset the form
        case DeleteThingActionBroadcastAction.type:
          if (action.data.thing && action.data.thing._id === action.data.deletedId) {
            newState = {};
          }
          break;
        // When external update occurs, the thing is reset, therefore the form should be reset
        case UpdateThingActionBroadcastAction.type:
          if (action.data.thing && action.data.thing._id === action.data.updatedThing._id) {
            newState = {};
          }
          break;
        // Init/start editing implies creation, therefore, reset to object
        case InitThingAction.type:
        case StartEditingThingAction.type:
          newState = {};
          break;
        // when validation occurs, set the property and the validity result
        case SetThingFormPropertyValidityAction.type:

          let newModelState = {};
          newModelState[action.data.modelState["$modelProperty"]] = action.data.modelState;

          newState = Object.assign({},
            state,
            action.data.formState,
            newModelState);

          let formValidity = true;

          for(var key in newState) {
            if (newState.hasOwnProperty(key)) {
              let modelState = newState[key];

              if (modelState && !modelState.$valid ) {
                formValidity = false;
                break;
              }
            }
          }

          newState.valid = formValidity;
          break;
        // don't do anything
        case SetThingPropertyAction.type:
          break;
      }
    } else {
      if (action.fetchStatus === FetchStatus.COMPLETE) {
        switch (action.type) {
          // once created, delete, get or update, reset
          case CreateThingAction.type:
          case DeleteThingAction.type:
          case GetThingAction.type:
          case UpdateThingAction.type:
            newState = null;
            break;
        }
      }
    }
  }

  return newState;
}