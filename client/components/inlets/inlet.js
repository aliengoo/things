"use strict";

import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';

import {toCustomHtmlAttributes} from '../../helpers/element-state-eval';

export default class Inlet extends Component {

  constructor(props) {
    super(props);

    this.setModelValue = this.setModelValue.bind(this);
  }

  componentDidMount() {
    const {setModelValue, modelProperty} = this.props;

    // force a value on initial load, this sets up the formState for the input
    let validationTimeout = setTimeout(() => {
      setModelValue(modelProperty, this.refs[modelProperty]);
      clearTimeout(validationTimeout);
    }, 1);
  }

  evaluateModelState() {
    const {modelProperty, formState} = this.props;

    let inletFormState = formState && formState.hasOwnProperty(modelProperty) ? formState[modelProperty] : undefined;

    let element = this.refs[modelProperty];

    if (!inletFormState) {
      return {
        $modelProperty: modelProperty,
        $element: element,
        $valueHistory: [],
        $value: null,
        $valid: null,
        $validity: {},
        $hasChanged: false,
        $dirty: false
      };
    }
    element.checkValidity();

    let valueHistory = inletFormState.$valueHistory || [];

    let previousValue = inletFormState.$valueHistory.length > 0 ?
      inletFormState.$valueHistory[0] :
      undefined;

    let hasChanged = !_.isEqual(normaliseFalsey(previousValue), normaliseFalsey(element.value));

    if (hasChanged) {
      // queue, add the new element value to the beginning
      let newLength = valueHistory.unshift(element.value);

      // if the queue size exceeds the buffer
      if (newLength > 5) {
        // discard the last item
        valueHistory.pop();
      }
    }

    let modelState = Object.assign({}, {
      $attachAttr: {},
      $element: element,
      $valueHistory: valueHistory,
      $value: element.value,
      $valid: element.validity.valid,
      $validity: element.validity,
      $hasChanged: hasChanged,
      $dirty: valueHistory.length > 0
    });

    modelState.$attachAttr["data-state-valid"] = modelState.$valid;
    modelState.$attachAttr["data-state-invalid"] = !modelState.$valid;
    modelState.$attachAttr["data-state-dirty"] = modelState.$dirty;
    modelState.$attachAttr["data-state-pristine"] = !modelState.$dirty;
    modelState.$attachAttr["data-state-has-changed"] = modelState.$hasChanged;

    return modelState;
  }

  setModelValue() {
    const {setModelValue} = this.props;
    const modelState = this.evaluateModelState();
    setModelValue(modelState);
  }

  _isFalsey(value) {
    const falseyValues = ["", null, undefined, NaN, 0];
    return falseyValues.indexOf(value) >= 0;
  }

  _normaliseFalsey() {
    return isFalsey(value) ? null : value;
  }
}

Inlet.propTypes = {
  formState: PropTypes.object,
  setModelValue: PropTypes.func.isRequired,
  modelProperty: PropTypes.string.isRequired
};