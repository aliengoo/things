"use strict";

import React, {Component, PropTypes} from 'react';

import ThingModelValueInput from './thing-model-value-input';

export default class ThingDepartment extends ThingModelValueInput {
  constructor(props) {
    super(props, "Department", "department", {"placeholder": "Enter a department (optional)"});
  }
}