"use strict";

import React, {Component, PropTypes} from 'react';

import ThingModelValueInput from './thing-model-value-input';

export default class ThingVendor extends ThingModelValueInput {
  constructor(props) {
    super(props, "Vendor", "vendor", {"placeholder": "Enter a vendor (optional)"});
  }
}