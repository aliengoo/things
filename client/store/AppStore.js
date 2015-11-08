"use strict";

import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { compose, createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/root-reducer';
import { devTools, persistState } from 'redux-devtools';

const initialState = {
  thing: {
    modelType: "thing",
    currentModel: {},
    previousModel: null,
    modelFormState: {
      valid: false
    },
    fetching: false,
    editing: false,
    externalDelete: false,
    externalUpdate: false,
    externalNew: false,
    err: null
  }

  //things: {
  //  currentModels: [],
  //  filter: {
  //    limit: 10
  //  },
  //  page: {
  //    current: 1
  //  },
  //  fetching: false,
  //  externalNew: false,
  //  err: null
  //}
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

let appStore;

export default function getAppStore() {
  if (!appStore) {
    appStore = finalCreateStore(rootReducer, initialState);
  }

  return appStore;
};