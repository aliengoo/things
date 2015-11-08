"use strict";

import ModelAction from './ModelAction';

const ActionType = "DeleteModelBroadcastAction";

/**
 * Invoke when another user deletes a model.
 */
export default class DeleteModelBroadcastAction extends ModelAction {
  constructor(modelType) {
    super(ActionType, modelType);
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

    if (action.type !== ActionType) {
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



