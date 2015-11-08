"use strict";

import React, {Component, PropTypes} from 'react';
import ModelFormGroupInlet from '../../../../model/components/ModelFormGroupInlet';

export default class ThingSerialNo extends Component {
  render() {
    const {containerModel, onChange} = this.props;

    return (<ModelFormGroupInlet
      label="Serial no."
      tag="input"
      modelProperty="serialNo"
      defaultValue=""
      html5InputOptions={{"placeholder": "Vendor serial no."}}
      containerModel={containerModel}
      onChange={onChange}
    />);
  }
}

ThingSerialNo.propTypes = {
  containerModel: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

