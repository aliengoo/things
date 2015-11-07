"use strict";

import ModelAction from './ModelAction';

/**
 * Invoke when another user deletes a model.
 */
export default class DeleteModelBroadcastAction extends ModelAction {
  constructor(modelType) {
    super("DeleteModelBroadcastAction", modelType);
  }

  /**
   *
   * @param {Object} previousState
   * @param {Object} action - action.data should be the updated model _id
   * @example
   *  Action data
   *  {updatedModelId: '234biebi2b3423', currentModelId: 'wefwefwef', modelType: 'thing'}
   *
   * @returns {*}
   */
  static containerModel(previousState = {}, action) {

    if (!ModelAction.isMatch(action, action.instance)) {
      return previousState;
    }

    let newState = {};

    const {updatedModelId, currentModelId, modelType} = action.data;

    if (modelType === action.modelType && updatedModelId === currentModelId) {
      newState.externalUpdate = true;
    }
    return Object.assign({}, previousState, newState);
  }
}



