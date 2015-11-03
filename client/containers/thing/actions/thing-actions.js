"use strict";

import AsyncActionCreator from '../../../actions/async-action-creator';
import SyncActionCreator from '../../../actions/sync-action-creator';

import ThingConfig from '../thing-config';

// expects {id}
const GetThingAction = AsyncActionCreator("GetThingAction", ThingConfig.container);
// expects nothing
const InitThingAction = SyncActionCreator("InitThingAction", ThingConfig.container);
// expects a string
const SetThingNameAction = SyncActionCreator("SetThingNameAction", ThingConfig.container);
// expects a string
const SetThingCategoryAction = SyncActionCreator("SetThingCategoryAction", ThingConfig.container);
// expects a type
const SetThingTypeAction =  SyncActionCreator("SetThingTypeAction", ThingConfig.container);

// expects an object representing the thing to create
const CreateThingAction = AsyncActionCreator("CreateThingAction");
// expects an object representing the thing to update
const UpdateThingAction = AsyncActionCreator("UpdateThingAction");
// expects a string containing the id of the thing to delete
const DeleteThingAction = AsyncActionCreator("DeleteThingAction");

// expects the current thing
const StartEditingThingAction = SyncActionCreator("StartEditingThingAction", ThingConfig.container);
// expects the thing object prior to editing
const AbortEditingThingAction = SyncActionCreator("AbortEditingThingAction", ThingConfig.container);

// Another client deleted a thing
const DeleteThingActionBroadcastAction = AsyncActionCreator("DeleteThingActionBroadcastAction");
const UpdateThingActionBroadcastAction = AsyncActionCreator("UpdateThingActionBroadcastAction");
const CreateThingActionBroadcastAction = AsyncActionCreator("CreateThingActionBroadcastAction");

module.exports.GetThingAction = GetThingAction;
module.exports.InitThingAction = InitThingAction;
module.exports.SetThingNameAction = SetThingNameAction;
module.exports.SetThingCategoryAction = SetThingCategoryAction;
module.exports.SetThingTypeAction = SetThingTypeAction;

module.exports.StartEditingThingAction = StartEditingThingAction;
module.exports.AbortEditingThingAction = AbortEditingThingAction;

module.exports.CreateThingAction = CreateThingAction;
module.exports.UpdateThingAction = UpdateThingAction;
module.exports.DeleteThingAction = DeleteThingAction;

// handle other clients
module.exports.DeleteThingActionBroadcastAction = DeleteThingActionBroadcastAction;
module.exports.UpdateThingActionBroadcastAction = UpdateThingActionBroadcastAction;
module.exports.CreateThingActionBroadcastAction = CreateThingActionBroadcastAction;
