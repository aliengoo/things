"use strict";

import SocketActionCreator from '../../../model/actions/socket-action-creator';
import SyncActionCreator from '../../../model/actions/sync-action-creator';

import ThingsConfig from '../things-config';


const FindThingsAction = SocketActionCreator("FindThingsAction", ThingsConfig.container);

module.exports.FindThingsAction = FindThingsAction;