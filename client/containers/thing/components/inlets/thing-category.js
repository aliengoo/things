"use strict";

import React, {Component, PropTypes} from 'react';
import ThingModelValueSelect from './thing-model-value-select';
import ThingConfig from '../../thing-config';

export default class ThingCategory extends ThingModelValueSelect {
  constructor(props) {
    super(props, "Category", "category", ThingConfig.categories, {required: true});
  }
}
