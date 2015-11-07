"use strict";

import _ from 'lodash';
import ModelAction from './ModelAction';

const defaultModelState = {
  $attachAttr: {},
  $modelProperty: "",
  $element: {},
  $valueHistory: [],
  $value: null,
  $valid: null,
  $validity: {},
  $hasChanged: false,
  $dirty: false
};


class ModelPropertyElementEvaluator {

  constructor(element, containerModel) {
    this.element = element;
    this.containerModel = containerModel;
  }

  evaluate() {
    if (!this.element) {
      console.warn("ModelPropertyElementEvaluator.evaluate did not have an element to evaluate");
      return undefined;
    }

    let previousModelState = this._getPreviousModelState(this.element, containerModel);
    let modelState = Object.assign({}, defaultModelState);

    this._elementValidityCheck(this.element, modelState);
    this._updateModelState(this.element, previousModelState, modelState);

    return modelState;
  }

  _getPreviousModelState(element, containerModel) {
    return containerModel.modelFormState[element.name];
  }

  _elementValidityCheck(element, modelState) {
    element.checkValidity();
    modelState.$valid = element.validity.valid;
  }

  _updateModelState(element, previousModelState, modelState) {

    let valueHistory = [...previousModelState.$valueHistory];

    let previousValue = valueHistory.length > 0 ?
      valueHistory[0] :
      undefined;

    modelState.hasChanged = !_.isEqual(
      this._normaliseFalsey(previousValue),
      this._normaliseFalsey(element.value));

    if (modelState.hasChanged) {
      let newLength = valueHistory.unshift(element.value);
      if (newLength > 5) {
        valueHistory.pop();
      }
    }

    modelState.$valueHistory = valueHistory;
    modelState.$dirty = valueHistory.length > 0;
    modelState.$attachAttr["data-state-valid"] = modelState.$valid;
    modelState.$attachAttr["data-state-invalid"] = !modelState.$valid;
    modelState.$attachAttr["data-state-dirty"] = modelState.$dirty;
    modelState.$attachAttr["data-state-pristine"] = !modelState.$dirty;
    modelState.$attachAttr["data-state-has-changed"] = modelState.$hasChanged;
  }

  _isFalsey(value) {
    const falseyValues = ["", null, undefined, NaN, 0];
    return falseyValues.indexOf(value) >= 0;
  }

  _normaliseFalsey(value) {
    return this._isFalsey(value) ? null : value;
  }
}

class ModelFormStateEvaluator {

  constructor(newModelState,  containerModel) {
    this.newModelState = newModelState;
    this.containerModel = containerModel;
  }

  evaluate() {
    const previousModelFormState = this.containerModel.modelFormState;

    let newModelFormState = Object.assign({}, previousModelFormState);
    // assign the newModelState into the newModelFormState
    newModelFormState[this.newModelState.$modelProperty] = this.newModelState;

    let valid = true;

    // in the context of the current change, re-evaluate the current form state validity
    for(let key in newModelFormState) {
      if (newModelFormState.hasOwnProperty(key)) {
        let modelState = newModelFormState[key];
        if (modelState.valid === false) {
          valid = false;
          break;
        }
      }
    }

    newModelFormState.valid = valid;

    return newModelFormState;
  }
}

export default class SetModelPropertyAction extends ModelAction {
  constructor(modelType) {
    super("SetModelPropertyAction", modelType);
  }

  /**
   *
   * @param previousState
   * @param action
   * @example
   *
   *  action.data.modelFormState = the current model state
   *  action.data.modelState = the new model state
   *
   * @returns {*}
   */
  static containerModel(previousState = {}, action) {

    if (!ModelAction.isMatch(action, action.instance)) {
      return previousState;
    }

    const element = action.data;

    // eval new model state, i.e. the current element being evaluated
    let modelPropertyElementEvaluator = new ModelPropertyElementEvaluator(element, previousState);
    let newModelState = modelPropertyElementEvaluator.evaluate();

    // re-eval the form state in the context of the newly evaluated model state
    let modelFormStateEvaluator = new ModelFormStateEvaluator(newModelState, previousState);
    let newFormState = modelFormStateEvaluator.evaluate();

    const {$modelProperty, $value} = newModelState;

    let currentModelUpdate = {};
    currentModelUpdate[$modelProperty] = $value;

    let newState = {
      modelFormState: newFormState,
      currentModel: Object.assign({}, previousState.currentModel, currentModelUpdate)
    };

    return Object.assign({}, previousState, newState);
  }
}


