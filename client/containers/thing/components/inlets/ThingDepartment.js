"use strict";

import React, {Component, PropTypes} from 'react';
import ModelFormGroupInlet from '../../../../model/components/ModelFormGroupInlet';

export default class ThingDepartment extends Component {
  render() {
    const {containerModel, onChange} = this.props;

    return (<ModelFormGroupInlet
      label="Department"
      tag="input"
      modelProperty="department"
      defaultValue=""
      html5InputOptions={{"placeholder": "The department"}}
      containerModel={containerModel}
      onChange={onChange}
    />);
  }
}

ThingDepartment.propTypes = {
  containerModel: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

