"use strict";

import React, {Component, PropTypes} from 'react';
import FormGroup from './form-group';
import ControlLabel from './control-label';

export default class ModelFormGroupStatic extends Component {
  render() {
    const {label, containerModel, defaultValue, modelProperty} = this.props;

    const {currentModel} = containerModel.currentModel;

    let modelPropertyValue = (currentModel &&
      currentModel[modelProperty]) ? currentModel[modelProperty] : (defaultValue || "[EMPTY]");

    return (
      <FormGroup>
        <ControlLabel>{label}</ControlLabel>
        <p className="form-control-static">{modelPropertyValue}</p>
      </FormGroup>
    );
  }
}

ModelFormGroupStatic.propTypes = {
  label: PropTypes.string.isRequired,
  containerModel: PropTypes.object,
  modelProperty: PropTypes.string.isRequired,
  defaultValue: PropTypes.string
};