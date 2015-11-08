"use strict";

import ModelAction from './ModelAction';

const ActionType = "UpdateModelBroadcastAction";

/**
 * Invoke when another user updates a model.
 */
export default class UpdateModelBroadcastAction extends ModelAction {
  constructor(modelType) {
    super(ActionType, modelType);
  }

  /**
   *
   * @param {Object} previousState
   * @param {Object} action - action.data - see example
   * @example
   *  Action data
   *  {updatedModelId: '234biebi2b3423', currentModelId: 'qwdqwd', modelType: 'thing'}
   *
   * @returns {*}
   */
  static containerModel(previousState = {}, action) {

    if (action.type !== ActionType) {
      return previousState;
    }

    const {updatedModelId, currentModelId, modelType} = action.data;

    let newState = {};

    if (modelType === action.modelType && updatedModelId === currentModelId) {
      newState.externalUpdate = true;
    }

    return Object.assign({}, previousState, newState);
  }
}



