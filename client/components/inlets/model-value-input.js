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

export default class ModelValueInput extends Component {

  render() {
    const {
      label,
      isEditable,
      model,
      modelProperty,
      html5InputOptions,
      setModelValue
      } = this.props;

    let editableContent = (
      <FormGroup>
        <ControlLabel>{label}</ControlLabel>
        <Inlet
          tag="input"
          model={model}
          modelProperty={modelProperty}
          defaultValue={""}
          html5InputOptions={html5InputOptions}
          setModelValue={setModelValue}
          isEditable={isEditable}
        />
      </FormGroup>);

    return isEditable ?
      editableContent :
      <ModelValueStatic label={label} model={model} modelProperty={modelProperty}/>;
  }
}

ModelValueInput.propTypes = {
  label: PropTypes.string,
  defaultValue: PropTypes.string,
  html5InputOptions: PropTypes.object,
  formState: PropTypes.object,
  model: PropTypes.object,
  modelProperty: PropTypes.string.isRequired,
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
  }
};
