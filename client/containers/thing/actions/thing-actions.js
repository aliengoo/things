"use strict";

import SocketActionCreator from '../../../model/actions/socket-action-creator';
import SyncActionCreator from '../../../model/actions/sync-action-creator';
import {evaluate} from '../../../helpers/element-state-eval';

import ThingConfig from '../thing-config';

// expects nothing
const InitThingAction = SyncActionCreator("InitThingAction", ThingConfig.container);

const SetThingPropertyAction = SyncActionCreator("SetThingPropertyAction", ThingConfig.container);
const SetThingFormPropertyValidityAction = SyncActionCreator("SetThingFormPropertyValidityAction", ThingConfig.container);


// expects the current thing
const StartEditingThingAction = SyncActionCreator("StartEditingThingAction", ThingConfig.container);
// expects the thing object prior to editing
const AbortEditingThingAction = SyncActionCreator("AbortEditingThingAction", ThingConfig.container);

// Another client deleted a thing
const DeleteThingActionBroadcastAction = SocketActionCreator("DeleteThingActionBroadcastAction");
const UpdateThingActionBroadcastAction = SocketActionCreator("UpdateThingActionBroadcastAction");
const CreateThingActionBroadcastAction = SocketActionCreator("CreateThingActionBroadcastAction");

module.exports.InitThingAction = InitThingAction;
module.exports.SetThingPropertyAction = SetThingPropertyAction;

module.exports.SetThingFormPropertyValidityAction = SetThingFormPropertyValidityAction;

module.exports.StartEditingThingAction = StartEditingThingAction;
module.exports.AbortEditingThingAction = AbortEditingThingAction;

// handle other clients
module.exports.DeleteThingActionBroadcastAction = DeleteThingActionBroadcastAction;
module.exports.UpdateThingActionBroadcastAction = UpdateThingActionBroadcastAction;
module.exports.CreateThingActionBroadcastAction = CreateThingActionBroadcastAction;
