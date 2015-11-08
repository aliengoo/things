"use strict";

import React, {Component, PropTypes} from 'react';
import ModelFormGroupInlet from '../../../../model/components/ModelFormGroupInlet';

export default class ThingVendor extends Component {
  render() {
    const {containerModel, onChange} = this.props;

    return (<ModelFormGroupInlet
      label="Vendor"
      tag="input"
      modelProperty="vendor"
      defaultValue=""
      html5InputOptions={{"placeholder": "Vendor serial no."}}
      containerModel={containerModel}
      onChange={onChange}
    />);
  }
}

ThingVendor.propTypes = {
  containerModel: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

