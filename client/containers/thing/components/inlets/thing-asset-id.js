"use strict";

import React, {Component, PropTypes} from 'react';

import ThingModelValueInput from './thing-model-value-input';

export default class ThingAssetId extends ThingModelValueInput {
  constructor(props) {
    super(props, "Asset ID", "assetId", {"placeholder": "Enter an asset ID (optional)"});
  }
}