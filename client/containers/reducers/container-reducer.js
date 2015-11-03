"use strict";
import {ContainerChangeAction} from '../actions/common-actions';

export function container(state = "", action) {
  let newState = state;

  if (action.type === ContainerChangeAction.type) {
    newState = action.data;
  }

  return newState;
}