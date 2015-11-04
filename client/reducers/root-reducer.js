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
import {thingForm} from '../containers/thing/reducers/thing-form-reducer';

// things container reducers
import {thingsFetching} from '../containers/things/reducers/things-fetching-reducer';
import {thingsFilter} from '../containers/things/reducers/things-filter-reducer';
import {thingsPage} from '../containers/things/reducers/things-page-reducer';
import {things} from '../containers/things/reducers/things-reducer';

const rootReducer = combineReducers({
  container,
  err,
  thingFetching,
  thingIsBeingEdited,
  thingPriorState,
  thing,
  thingForm,
  thingWasDeleted,
  thingWasUpdated,

  thingsFetching,
  thingsFilter,
  thingsPage,
  things
});

export default rootReducer;