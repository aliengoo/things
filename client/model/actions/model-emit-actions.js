"use strict";

import SocketActionCreator from './socket-action-creator';
import ConstraintValidation from '../constraints/constraint-validation';
import ModelEmitActionConstraints from '../constraints/model-emit-action-constraints';


function validationOptions(options) {
  ConstraintValidation.validate(options, ModelEmitActionConstraints, true);
}

export function createGetModelAction(options) {
  options.actionType = "GetModelAction";
  validationOptions(options);
  return SocketActionCreator(options);
}

export function createUpdateModelAction(options) {
  options.actionType = "UpdateModelAction";
  validationOptions(options);
  return SocketActionCreator(options);
}

export function createCreateModelAction(options) {
  options.actionType = "CreateModelAction";
  validationOptions(options);
  return SocketActionCreator(options);
}

export function createDeleteModelAction(options) {
  options.actionType = "DeleteModelAction";
  validationOptions(options);
  return SocketActionCreator( options);
}

