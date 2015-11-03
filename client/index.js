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
import ThingsContainer from './containers/things/things-container';
import ThingContainer from './containers/thing/thing-container';
import NoMatchContainer from './containers/no-match/no-match-container';

import getStore from './store/things-store';

const store = getStore();

var reactContainer = document.getElementById('react-container');

var providerRoot = <Provider store={store}>
  <Router history={history()}>
    <Route path="/thing" component={ThingContainer}/>
    <Route path="/thing/:id" component={ThingContainer}/>
    <Route path="/things" component={ThingsContainer}/>
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
