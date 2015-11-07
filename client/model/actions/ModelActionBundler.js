"use strict";

import AbortEditingModelAction from './AbortEditingModelAction.js';
import BeginEditingModelAction from './BeginEditingModelAction.js';
import CreateModelAction from './CreateModelAction.js';
import CreateModelBroadcastAction from './CreateModelBroadcastAction.js';
import DeleteModelAction from './DeleteModelAction.js';
import DeleteModelBroadcastAction from './DeleteModelBroadcastAction.js';
import GetModelAction from './GetModelAction.js';
import InitialiseModelAction from './InitialiseModelAction';
import SetModelPropertyAction from './SetModelPropertyAction.js';
import UpdateModelAction from './UpdateModelAction.js';
import UpdateModelBroadcastAction from './UpdateModelBroadcastAction.js';

export default class ModelActionBundler {

  static bundle(modelType) {
    return {
      AbortEditingThingAction: new AbortEditingModelAction(modelType),
      BeginEditingModelAction: new BeginEditingModelAction(modelType),
      CreateModelAction: new CreateModelAction(modelType),
      CreateModelBroadcastAction: new CreateModelBroadcastAction(modelType),
      DeleteModelAction: new DeleteModelAction(modelType),
      DeleteModelBroadcastAction: new DeleteModelBroadcastAction(modelType),
      GetModelAction: new GetModelAction(modelType),
      InitialiseModelAction: new InitialiseModelAction(modelType),
      SetModelPropertyAction: new SetModelPropertyAction(modelType),
      UpdateModelAction: new UpdateModelAction(modelType),
      UpdateModelBroadcastAction: new UpdateModelBroadcastAction(modelType)
    };
  }
}
