"use strict";

import React, {Component, PropTypes} from 'react';

import ThingModelValueInput from './thing-model-value-input';

export default class ThingUser extends ThingModelValueInput {
  constructor(props) {
    super(props, "User", "user", {"placeholder": "Enter a user (optional)"});
  }
}