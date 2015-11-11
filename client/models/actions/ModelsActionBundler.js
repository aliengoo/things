"use strict";

import SetPageAction from './SetPageAction';
import ApplyFilterAction from './ApplyFilterAction';

export default class ModelActionBundler {

  static bundle(modelType) {
    return {
      SetPageAction: new SetPageAction(modelType),
      ApplyFilterAction: new ApplyFilterAction(modelType)
    };
  }
}
