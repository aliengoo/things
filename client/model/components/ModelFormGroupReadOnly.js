"use strict";

import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import FormGroup from '../../components/outlets/FormGroup';
import ControlLabel from '../../components/outlets/ControlLabel';

export default class ModelFormGroupReadOnly extends Component {
  render() {
    const {containerModel, label, modelProperty} = this.props;

    if (containerModel.editing) {
      return (<div></div>);
    }

    const value = _.get(containerModel, `currentModel.${modelProperty}`, "[EMPTY]");

    console.log(containerModel.currentModel);

    return (
      <FormGroup>
        <ControlLabel>{label}</ControlLabel>
        <p className="form-control-static">{value}</p>
      </FormGroup>);
  }
}

ModelFormGroupReadOnly.propTypes = {
  modelProperty: PropTypes.string.isRequired,
  containerModel: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired
};
