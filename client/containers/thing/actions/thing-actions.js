"use strict";

import AsyncActionCreator from '../../../actions/async-action-creator';
import SyncActionCreator from '../../../actions/sync-action-creator';

import ThingConfig from '../thing-config';

const GetThingCategoriesAction = AsyncActionCreator("GetThingCategoriesAction", ThingConfig.container);
const SetThingNameAction = SyncActionCreator("SetThingNameAction", ThingConfig.container);
const SetThingCategoryAction = SyncActionCreator("SetThingCategoryAction", ThingConfig.container);
const SetThingTypeAction =  SyncActionCreator("SetThingTypeAction", ThingConfig.container);

// originating client
const CreateThingAction = AsyncActionCreator("CreateThingAction");
const UpdateThingAction = AsyncActionCreator("UpdateThingAction");
const DeleteThingAction = AsyncActionCreator("DeleteThingAction");

const StartEditingThingAction = SyncActionCreator("StartEditingThingAction", ThingConfig.container);
const AbortEditingThingAction = SyncActionCreator("AbortEditingThingAction", ThingConfig.container);

// Another client deleted a thing
const DeleteThingActionBroadcastAction = AsyncActionCreator("DeleteThingActionBroadcastAction");
const UpdateThingActionBroadcastAction = AsyncActionCreator("UpdateThingActionBroadcastAction");
const CreateThingActionBroadcastAction = AsyncActionCreator("CreateThingActionBroadcastAction");

module.exports.GetThingCategoriesAction = GetThingCategoriesAction;
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
