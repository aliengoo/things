"use strict";

import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import FormGroup from './../outlets/form-group';
import ControlLabel from './../outlets/control-label';
import ModelValueStatic from './../outlets/model-value-static';
import Inlet from '../../components/inlets/inlet';

export default class ModelValueSelect extends Component {

  render() {
    const {
      options,
      formState,
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
          tag="select"
          options={options}
          formState={formState}
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

ModelValueSelect.propTypes = {
  // ControlLabel value
  label: PropTypes.string,
  options: PropTypes.array,
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

ModelValueSelect.defaultProps = {
  label: "Label property missing",
  model: {},
  options: [],
  formState: {},
  html5InputOptions: {
    type: "text",
    required: false,
    disabled: false
  }
};
