"use strict";

import AbortEditingModelAction from './AbortEditingModelAction.js';
import BeginEditingModelAction from './BeginEditingModelAction.js';
import CreateModelAction from './CreateModelAction.js';
import CreateModelBroadcastAction from './CreateModelBroadcastAction.js';
import DeleteModelAction from './DeleteModelAction.js';
import DeleteModelBroadcastAction from './DeleteModelBroadcastAction.js';
import GetModelAction from './GetModelAction.js';
import InitialiseCurrentModelAction from './InitialiseCurrentModelAction';
import SetModelPropertyAction from './SetModelPropertyAction.js';
import UpdateModelAction from './UpdateModelAction.js';
import UpdateModelBroadcastAction from './UpdateModelBroadcastAction.js';

export default class ModelActionBundler {

  static bundle(modelType) {
    return {
      AbortEditingModelAction: new AbortEditingModelAction(modelType),
      BeginEditingModelAction: new BeginEditingModelAction(modelType),
      CreateModelAction: new CreateModelAction(modelType),
      CreateModelBroadcastAction: new CreateModelBroadcastAction(modelType),
      DeleteModelAction: new DeleteModelAction(modelType),
      DeleteModelBroadcastAction: new DeleteModelBroadcastAction(modelType),
      GetModelAction: new GetModelAction(modelType),
      InitialiseCurrentModelAction: new InitialiseCurrentModelAction(modelType),
      SetModelPropertyAction: new SetModelPropertyAction(modelType),
      UpdateModelAction: new UpdateModelAction(modelType),
      UpdateModelBroadcastAction: new UpdateModelBroadcastAction(modelType)
    };

  }
}
