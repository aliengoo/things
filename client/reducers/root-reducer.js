"use strict";

import {combineReducers} from 'redux';

// global reducers
import {err} from './err';

import AbortEditingModelAction from './../model/actions/AbortEditingModelAction.js';
import BeginEditingModelAction from './../model/actions/BeginEditingModelAction.js';
import CreateModelAction from './../model/actions/CreateModelAction.js';
import CreateModelBroadcastAction from './../model/actions/CreateModelBroadcastAction.js';
import DeleteModelAction from './../model/actions/DeleteModelAction.js';
import DeleteModelBroadcastAction from './../model/actions/DeleteModelBroadcastAction.js';
import GetModelAction from './../model/actions/GetModelAction.js';
import SetModelPropertyAction from './../model/actions/SetModelPropertyAction.js';
import SetModelPropertyStateAction from './../model/actions/SetModelPropertyStateAction.js';
import UpdateModelAction from './../model/actions/UpdateModelAction.js';
import UpdateModelBroadcastAction from './../model/actions/UpdateModelBroadcastAction.js';
import ModelReducerBundler from './../model/actions/ModelReducerBundler';

let model = ModelReducerBundler.bundle([
  AbortEditingModelAction,
  BeginEditingModelAction,
  CreateModelAction,
  CreateModelBroadcastAction,
  DeleteModelAction,
  DeleteModelBroadcastAction,
  GetModelAction,
  SetModelPropertyAction,
  SetModelPropertyStateAction,
  UpdateModelAction,
  UpdateModelBroadcastAction
]);

const rootReducer = combineReducers({
  thing: model
});

export default rootReducer;