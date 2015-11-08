"use strict";

import _ from 'lodash';
import React, {Component, PropTypes} from 'react';
import ModelInlet from './ModelInlet';
import FormGroup from '../../components/outlets/FormGroup';
import ControlLabel from '../../components/outlets/ControlLabel';
import Html5ModelError from '../components/Html5ModelError';
import ModelFormGroupReadOnly from './ModelFormGroupReadOnly';

export default class ModelFormGroupInlet extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    const {
      label,
      tag,
      modelProperty,
      defaultValue,
      html5InputOptions,
      containerModel,
      onChange
      } = this.props;


    if (!containerModel.editing) {
      return (
        <ModelFormGroupReadOnly
          containerModel={containerModel}
          label={label}
          modelProperty={modelProperty}
        />);
    }

    const currentModelState = _.get(containerModel, `modelFormState.${modelProperty}`, undefined);

    return (
      <FormGroup>
        <ControlLabel>{label}</ControlLabel>
        <ModelInlet
          tag={tag}
          modelProperty={modelProperty}
          defaultValue={defaultValue}
          html5InputOptions={html5InputOptions}
          containerModel={containerModel}
          onChange={onChange}
        />
        <Html5ModelError modelState={currentModelState}/>
      </FormGroup>);
  }
}

ModelFormGroupInlet.propTypes = {
  label: PropTypes.string,
  tag: PropTypes.string.isRequired,
  modelProperty: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  // https://developer.mozilla.org/en/docs/Web/HTML/Element/Input
  html5InputOptions: PropTypes.object,
  containerModel: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};
