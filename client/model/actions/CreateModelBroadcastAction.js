"use strict";

import ModelAction from './ModelAction';

const ActionType = "CreateModelBroadcastAction";

/**
 * Invoke when another user creates a new model.
 */
export default class CreateModelBroadcastAction extends ModelAction {
  constructor(modelType) {
    super(ActionType, modelType);
  }

  /**
   *
   * @param {Object} previousState
   * @param {Object} action - action.data should be the updated model _id
   * @example
   *  Server data
   *  {_id: '234biebi2b3423', modelType: 'thing'}
   *
   * @returns {*}
   */
  static containerModel(previousState = {}, action) {
    if (action.type !== ActionType) {
      return previousState;
    }

    let newState = {
      externalNew: true,
      externalUpdate: false,
      externalDelete: false
    };

    return Object.assign({}, previousState, newState);
  }
}




