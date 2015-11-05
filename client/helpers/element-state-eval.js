"use strict";

import _ from 'lodash';

const historyBuffer = 5;

const falseyValues = ["", null, undefined, NaN, 0];

export function isFalsey(value) {
  return falseyValues.indexOf(value) >= 0;
}

export function normaliseFalsey(value) {
  return isFalsey(value) ? null : value;
}

export function toCustomHtmlAttributes(formState, property) {
  let attr = {};

  if (formState && formState.hasOwnProperty(property)) {
    let elementState = formState[property];

    attr["data-state-valid"] = elementState.$valid;
    attr["data-state-invalid"] = !elementState.$valid;
    attr["data-state-dirty"] = elementState.$dirty;
    attr["data-state-pristine"] = !elementState.$dirty;
    attr["data-state-has-changed"] = elementState.$hasChanged;
  }
  return attr;
}

//  This is meta-angular
// If the previous value is not the current value, then the value is not considered pristine
export function evaluate(element, previousValue = null, previousFormState = {}) {
  if (!element) {
    return Object.assign({}, {
      $element: element,
      $valueHistory: [],
      $value: null,
      $valid: null,
      $validity: {},
      $hasChanged: false,
      $dirty: false
    });
  }

  element.checkValidity();

  let hasChanged = !_.isEqual(normaliseFalsey(previousValue), normaliseFalsey(element.value));

  let valueHistory = previousFormState.$valueHistory || [];

  if (hasChanged) {
    // queue, add the new element value to the beginning
    let newLength = valueHistory.unshift(element.value);

    // if the queue size exceeds the buffer
    if (newLength > historyBuffer) {
      // discard the last item
      valueHistory.pop();
    }
  }

  return Object.assign({}, {
    $element: element,
    $valueHistory: valueHistory,
    $value: element.value,
    $valid: element.validity.valid,
    $validity: element.validity,
    $hasChanged: hasChanged,
    $dirty: valueHistory.length > 0
  });
}
