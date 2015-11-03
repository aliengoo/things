"use strict";

import AsyncActionCreator from '../../../actions/async-action-creator';
import SyncActionCreator from '../../../actions/sync-action-creator';

import ThingsConfig from '../things-config';


const FindThingsAction = AsyncActionCreator("FindThingsAction", ThingsConfig.container);

module.exports.FindThingsAction = FindThingsAction;