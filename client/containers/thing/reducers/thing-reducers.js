"use strict";

import AsyncStatus from '../../../api/async-status';

import ThingConfig from '../thing-config';

import {

} from '../actions/thing-actions';

export function thingFetching(state = false, action) {
  var newState = state;

  if (action.container === ThingConfig.container &&
    action._asyncStatus === AsyncStatus.FETCHING) {
    newState = true;
  }

  return newState;
}

export function thing(state = null, action) {
  var newState = state;



  return newState;
}

export function thingBeingEditedPriorState(state = null, action) {

}

export function thingIsBeingEdited(state = false, action) {


}
