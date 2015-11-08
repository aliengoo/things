"use strict";

import React, {Component, PropTypes} from 'react';
import ModelFormGroupInlet from '../../../../model/components/ModelFormGroupInlet';

export default class ThingName extends Component {
  render() {
    const {containerModel, onChange} = this.props;

    return (<ModelFormGroupInlet
      label="Name"
      tag="input"
      modelProperty="name"
      defaultValue=""
      html5InputOptions={{"placeholder": "Enter the name of the thing", "required": true}}
      containerModel={containerModel}
      onChange={onChange}
    />);
  }
}

ThingName.propTypes = {
  containerModel: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

