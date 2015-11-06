"use strict";

import SyncActionCreator from 'sync-action-creator';
import ConstraintValidation from '../constraints/constraint-validation';

// When another user deletes a record
export function createDeleteModelActionBroadcastAction(options) {
  options.actionType = "DeleteModelActionBroadcastAction";
  options.dataConstraint = {
    // _id of the deleted data
    _id: {
      presence: true
    },

    // the current model in view - this is used to test if the model currently
    // being viewed is the one deleted externally
    model: {
      presence: true
    }
  };
  return SyncActionCreator(options);
}

export function createUpdateModelActionBroadcastAction(options) {
  options.actionType = "UpdateModelActionBroadcastAction";

  options.dataConstraint = {
    // the model broadcast by server that has been edited
    updatedModel: {
      presence: true
    },

    // the current model in view - this is used to test if the model currently
    // being viewed is the one updated externally
    model: {
      presence: true
    }
  };
  return SyncActionCreator(options);
}