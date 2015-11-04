"use strict";

import _ from 'lodash';

/**
 * Creates an async action
 * @param type
 * @param container - root container
 * @param extras - extends the action with additional properties.  When properties collide, action wins over extras.
 * @returns {Function}
 * @example
 *  import SyncActionCreator from './sync-action-creator';
 *  var ActionNameAction = SyncActionCreator("ActionNameAction");
 *  dispatch(ActionNameAction(data));
 */
export default function creator(type, container, extras) {
  return {
    type,
    create: (data) => {
      let action = {
        _asyncStatus: undefined,
        container,
        type,
        data
      };

      if (_.isObject(extras)) {
        action = Object.assign(extras, action);
      }

      return action;
    }
  };

};