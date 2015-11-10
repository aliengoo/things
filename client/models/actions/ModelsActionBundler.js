"use strict";

import SetPageAction from './SetPageAction';
import FilterModelsAction from './FilterModelsAction';

export default class ModelActionBundler {

  static bundle(modelType) {
    return {
      SetPageAction: new SetPageAction(modelType),
      FilterModelsAction: new FilterModelsAction(modelType)
    };
  }
}
