"use strict";

import validate from 'validate.js';

export default class ConstraintValidation {

  static validate(data, constraints, shouldThrow) {
    let validationResult = validate(data, constraints);

    if (validationResult) {
      if (shouldThrow) {
        throw validationResult;
      } else {
        console.warn("ConstraintValidation failed:", validationResult);
      }
    }
  }
}