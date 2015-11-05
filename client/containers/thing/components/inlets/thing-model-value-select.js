"use strict";

import React, {Component, PropTypes} from 'react';
import ModelValueSelect from '../../../../components/inlets/model-value-select';
import ThingConfig from '../../thing-config';

export default class ThingModelValueSelect extends Component {
  constructor(props, label, modelProperty, options, html5InputOptions) {
    super(props);
    this.label = label;
    this.modelProperty = modelProperty;
    this.options = options;
    this.html5InputOptions = html5InputOptions || {};
  }

  render() {
    const {
      isEditable,
      model,
      formState,
      setModelValue
      } = this.props;

    return (
      <ModelValueSelect
        label={this.label}
        options={this.options}
        model={model}
        modelProperty={this.modelProperty}
        isEditable={isEditable}
        formState={formState}
        setModelValue={setModelValue}
        html5InputOptions={this.html5InputOptions}
      />);
  }
}

ThingModelValueSelect.propTypes = {
  model: PropTypes.object,
  isEditable: PropTypes.bool,
  formState: PropTypes.object,
  setModelValue: PropTypes.func.isRequired
};