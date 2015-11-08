"use strict";

window.jQuery = require('jquery');
window._ = require('lodash');
require('bootstrap');

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Link} from 'react-router';
import history from 'history/lib/createHashHistory';

import { Provider } from 'react-redux';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import ThingContainer from './containers/thing/ThingContainer';
import NoMatchContainer from './containers/no-match/no-match-container';

import getStore from './store/AppStore';

const store = getStore();

var reactContainer = document.getElementById('react-container');

var providerRoot = <Provider store={store}>
  <Router history={history()}>
    <Route path="/thing" component={ThingContainer}/>
    <Route path="/thing/:id" component={ThingContainer}/>
    <Route path="*" component={NoMatchContainer}/>
  </Router>
</Provider>;

if (reactContainer.hasAttribute("debug")) {
  ReactDOM.render(
    <div>
      {providerRoot}
      <DebugPanel top right bottom>
        <DevTools store={store} monitor={LogMonitor}/>
      </DebugPanel>
    </div>
    , reactContainer);
} else {
  ReactDOM.render(
    <div>
      {providerRoot}
    </div>
    , reactContainer);
}
