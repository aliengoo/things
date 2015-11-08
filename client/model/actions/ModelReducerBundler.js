"use strict";

export default class ModelReducerBundler {

  /**
   * Runs each action.model function in
   * @param {Array} modelActions - array of action classes
   * @returns {Function} - the reducer which rolls over each action.model function, and returns a new state
   */
  static bundle(modelActions) {
    return (previousState = {}, action) => {

      let memoState = Object.assign({}, previousState);

      modelActions.forEach((modelAction) => {
        memoState = modelAction.containerModel(memoState, action);
      });

      return memoState;
    };
  }
}
