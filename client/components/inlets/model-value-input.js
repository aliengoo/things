"use strict";

import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';

import {toCustomHtmlAttributes} from '../../helpers/element-state-eval';

import FormGroup from './../outlets/form-group';
import ControlLabel from './../outlets/control-label';
import ModelValueStatic from './../outlets/model-value-static';
import Html5ErrorHelpBlock from './../outlets/html5-error-help-block';
import Inlet from './inlet';

export default class ModelValueInput extends Inlet {

  constructor(props) {
    super(props, "input");
    this._renderEditable = this._renderEditable.bind(this);
  }

  render() {
    const {
      label,
      isEditable,
      model,
      modelProperty
      } = this.props;

    return isEditable ?
      super.render() :
      <ModelValueStatic label={label} model={model} modelProperty={modelProperty}/>;
  }
}

ModelValueInput.propTypes = {
  // ControlLabel value
  label: PropTypes.string,
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

ModelValueInput.defaultProps = {
  type: "text",
  label: "Label property missing",
  model: {},
  formState: {},
  html5InputOptions: {
    type: "text",
    required: false,
    disabled: false
  },
  debounce: 0
};
