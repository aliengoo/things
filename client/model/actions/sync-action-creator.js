"use strict";

import _ from 'lodash';
import ConstraintValidation from '../constraints/constraint-validation';

/**
 * Creates an async action
 * @param options = {actionType, container, extras} - extras can add properties to the data
 * @returns {Function}
 * @example
 *  import SyncActionCreator from './sync-action-creator';
 *  var ActionNameAction = SyncActionCreator("ActionNameAction");
 *  dispatch(ActionNameAction(data));
 */
export default function creator(options) {
  return {
    actionType: options.actionType,
    invoke: (data) => {

      if (options.dataConstraint) {
        ConstraintValidation.validate(data, options.dataConstraint, true);
      }

      let action = {
        fetchStatus: undefined,
        container: options.container,
        actionType: options.actionType,
        data
      };

      if (_.isObject(options.extras)) {
        action = Object.assign(options.extras, action);
      }

      return action;
    }
  };

};