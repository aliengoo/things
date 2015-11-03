"use strict";

import {combineReducers} from 'redux';

// global reducers
import {err} from './err-reducer';

// container reducers
import {container} from '../containers/reducers/container-reducer';

// thing container reducers
import {thingFetching} from '../containers/thing/reducers/thing-fetching-reducer';
import {thingIsBeingEdited} from '../containers/thing/reducers/thing-is-being-edited-reducer';
import {thingPriorState} from '../containers/thing/reducers/thing-prior-state-reducer';
import {thing} from '../containers/thing/reducers/thing-reducer';
import {thingWasDeleted} from '../containers/thing/reducers/thing-was-deleted-reducer';
import {thingWasUpdated} from '../containers/thing/reducers/thing-was-updated-reducer';

// things container reducers

const rootReducer = combineReducers({
  container,
  err,
  thingFetching,
  thingIsBeingEdited,
  thingPriorState,
  thing,
  thingWasDeleted,
  thingWasUpdated
});

export default rootReducer;