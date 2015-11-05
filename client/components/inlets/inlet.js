"use strict";

import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';

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

export default class Inlet extends Component {

  constructor(props, tag) {
    super(props);
    this.tag = tag;
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
    let inletFormState = this.getModelState();
    let element = this.refs[modelProperty];

    if (!inletFormState) {
      return Object.assign({}, defaultModelState, {
        $formState: formState,
        $modelProperty: modelProperty,
        $element: element
      });
    }

    element.checkValidity();

    let valueHistory = inletFormState.$valueHistory || [];

    let previousValue = inletFormState.$valueHistory.length > 0 ?
      inletFormState.$valueHistory[0] :
      undefined;

    let hasChanged = !_.isEqual(
      this._normaliseFalsey(previousValue),
      this._normaliseFalsey(element.value));

    if (hasChanged) {
      let newLength = valueHistory.unshift(element.value);
      if (newLength > 5) {
        valueHistory.pop();
      }
    }

    let modelState = Object.assign({}, {
      $formState: formState,
      $attachAttr: {
      },
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

  getModelState() {
    const {formState, modelProperty} = this.props;

    if (formState && formState.hasOwnProperty(modelProperty)) {
      return formState[modelProperty];
    }

    return undefined;
  }

  render() {
    const {
      model,
      modelProperty,
      defaultValue,
      html5InputOptions
      } = this.props;

    let modelState = this.getModelState();

    let attributes = Object.assign({}, {
        className: "form-control",
        name: modelProperty,
        ref: modelProperty,
        value: model[modelProperty],
        defaultValue: defaultValue,
        onChange: this._setModelValue
      },
      html5InputOptions,
      modelState.$attachAttr);

    return React.createElement(this.tag, attributes);
  }

  _isFalsey(value) {
    const falseyValues = ["", null, undefined, NaN, 0];
    return falseyValues.indexOf(value) >= 0;
  }

  _normaliseFalsey() {
    return this._isFalsey(value) ? null : value;
  }
}

Inlet.propTypes = {
  options: PropTypes.array,
  defaultValue: PropTypes.string,
  // https://developer.mozilla.org/en/docs/Web/HTML/Element/Input
  html5InputOptions: PropTypes.object,
  formState: PropTypes.object,
  // The parent model
  model: PropTypes.object,
  // The parent model property
  modelProperty: PropTypes.string.isRequired,
  // output from component
  setModelValue: PropTypes.func.isRequired,
  isEditable: PropTypes.bool
};