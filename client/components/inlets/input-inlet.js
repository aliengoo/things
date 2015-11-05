"use strict";

import React, {Component, PropTypes} from 'react';
import Inlet from './inlet';

export default class InputInlet extends Inlet {
  constructor(props) {
    super(props, "input");
  }
}