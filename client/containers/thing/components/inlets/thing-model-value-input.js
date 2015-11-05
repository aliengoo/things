"use strict";

import React, {Component, PropTypes} from 'react';

import ModelValueInput from '../../../../components/inlets/model-value-input';

export default class ThingModelValueInput extends Component {
  constructor(props, label, modelProperty, html5InputOptions) {
    super(props);
    this.label = label;
    this.modelProperty = modelProperty;
    this.html5InputOptions = html5InputOptions || {};
  }

  render() {
    const {
      isEditable,
      model,
      formState,
      setModelValue
      } = this.props;

    return (<ModelValueInput
      label={this.label}
      model={model}
      modelProperty={this.modelProperty}
      isEditable={isEditable}
      formState={formState}
      setModelValue={setModelValue}
      html5InputOptions = {this.html5InputOptions}/>);
  }
}

ThingModelValueInput.propTypes = {
  model: PropTypes.object,
  isEditable: PropTypes.bool,
  formState: PropTypes.object,
  setModelValue: PropTypes.func.isRequired
};