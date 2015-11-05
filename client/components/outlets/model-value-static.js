"use strict";

import React, {Component, PropTypes} from 'react';
import FormGroup from './form-group';
import ControlLabel from './control-label';

export default class ModelValueStatic extends Component {
  render() {
    const {label, model, modelProperty, defaultValue} = this.props;

    let modelPropertyValue = (model && model[modelProperty]) ? model[modelProperty] : (defaultValue || "[EMPTY]");

    return (
        <FormGroup>
          <ControlLabel>{label}</ControlLabel>
          <p className="form-control-static">{modelPropertyValue}</p>
        </FormGroup>
      );
  }
}

ModelValueStatic.propTypes = {
  label: PropTypes.string.isRequired,
  model: PropTypes.object,
  modelProperty: PropTypes.string.isRequired,
  defaultValue: PropTypes.string
};