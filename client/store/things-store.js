"use strict";

import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { compose, createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/root-reducer';
import { devTools, persistState } from 'redux-devtools';

const initialState = {
  container: "",

  // set when a filter operation is ongoing
  thingsFetching: false,

  // the filter used for all things
  thingsFilter: {
    limit: 10
  },

  // the things currently being viewed based on the thingsFilter
  things: [],

  thingsPage: {
    page: 1
  },

  // set then a single thing is in the view, and being pulled or pushed to the server
  thingFetching: false,

  // the thing currently being viewed or edited
  thing: null,

  thingForm: {},

  // when a thing is being edited, this is the previous state
  thingPriorState: null,

  thingIsBeingEdited: false,

  // Set to true when an external user deletes a thing
  thingWasDeleted: false,

  // Set to true when an external user updates a thing
  thingWasUpdated: false,

  // global err state
  err: null
};

const loggerMiddleware = createLogger();

let finalCreateStore;

if (document.getElementById('react-container').hasAttribute("debug")) {

  // include debug information in page
  finalCreateStore = compose(
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware),
    devTools(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  )(createStore);
} else {


  finalCreateStore = applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )(createStore);
}

let thingsStore;

export default function getStore() {
  if (!thingsStore) {
    thingsStore = finalCreateStore(rootReducer, initialState);
  }

  return thingsStore;
};