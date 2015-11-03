"use strict";

import _ from 'lodash';
import AsyncStatus from '../../../api/async-status';
import ThingsConfig from '../things-config';

import {
  UpdateThingAction, // true (when fetching or on fail), false (when complete)
  DeleteThingAction, // false - you're not editing, your deleting
} from '../../thing/actions/thing-actions';

import {
  FindThingsAction
} from '../actions/things-actions';

function remove(things, id) {
  let indexOf = _.findIndex(things, {_id: id});

  if (indexOf >= 0) {
    return [
      ...things.slice(0, indexOf),
      ...things.slice(indexOf + 1)];
  }

  return things;
}

function update(things, updatedThing) {
  let indexOf = _.findIndex(things, {_id: updatedThing._id});

  if (indexOf >= 0) {
    return [
      ...things.slice(0, indexOf),
      Object.assign({}, updatedThing),
      ...things.slice(indexOf + 1)];
  }

  return things;
}

export function things(state = [], action) {

  var newState = state;
  if (action.container !== ThingsConfig.container) {
    return newState;
  }

  if (action._asyncStatus === AsyncStatus.COMPLETE) {
    switch (action.type) {
      case FindThingsAction.type:
        newState = action.data;
        break;
      case UpdateThingAction.type:
        newState = update(state, action.data);
        break;
      case DeleteThingAction.type:
        newState = remove(state, action.data);
        break;
    }
  }
}

