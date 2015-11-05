"use strict";

import React, {Component, PropTypes} from 'react';

import ThingModelValueInput from './thing-model-value-input';

export default class ThingName extends ThingModelValueInput {
  constructor(props) {
    super(props, "Name", "name", {"required": true, "placeholder": "Enter a name (required)"});
  }
}