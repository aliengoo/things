"use strict";

import SyncActionCreator from './sync-action-creator';
import ConstraintValidation from '../constraints/constraint-validation';

/**
 *
 * @param options {{modelConstraints, container}}
 * @returns {{actionType, invoke}|Function}
 */
export function createBeginEditingModelAction(options) {
  option.actionType = "BeginEditingModelAction";

  ConstraintValidation.validate(options, {
    container: {
      presence: true
    },
    modelConstraints: {
      presence: true
    }
  }, true);

  // TODO: When invoked, the "action.data" should be the current model, this is set as the modelPriorState
  return SyncActionCreator(options);
}

/**
 * Creates the AbortEditingModelAction.  createAbortEditingModelAction(options).invoke(data).
 * @example
 *
 * let options = {
 *  container: "thing",
 *  modelType: "thing",
 *  modelConstraints: {
 *    // thing constraints here
 *  }
 * };
 *
 * // create the action
 * const AbortEditingModelAction = createAbortEditingModelAction(options);
 *
 * // invoke the action
 * dispatch(AbortEditingModelAction.invoke(modelPriorState));
 *
 * @param options {{modelConstraints, container}}
 * @returns {{actionType, invoke}|Function}
 */
export function createAbortEditingModelAction(options) {
  option.actionType = "AbortEditingModelAction";

  ConstraintValidation.validate(options, {
    container: {
      presence: true
    },
    modelConstraints: {
      presence: true
    }
  }, true);

  option.dataConstraint = {};

  // TODO: When the action is invoked, the "action.data" value should be the prior state
  return SyncActionCreator(options);
}

export function createSetModelPropertyAction(options) {
  options.actionType = "SetModelPropertyAction";
  return SyncActionCreator(options);
}

export function createValidateModelPropertyAction(options) {
  // TODO: should invoke ValidateContainerAction
  options.actionType = "ValidateModelPropertyAction";
  return SyncActionCreator(options);
}

export function createValidateContainerAction(options) {
  options.actionType = "ValidateContainerAction";
  return SyncActionCreator(options);
}