"use strict";

import React, {Component, PropTypes} from 'react';
import ModelFormGroupInlet from '../../../../model/components/ModelFormGroupInlet';

export default class ThingAssetId extends Component {
  render() {
    const {containerModel, onChange} = this.props;

    return (<ModelFormGroupInlet
      label="Asset ID"
      tag="input"
      modelProperty="assetId"
      defaultValue=""
      html5InputOptions={{"placeholder": "The internal reference"}}
      containerModel={containerModel}
      onChange={onChange}
    />);
  }
}

ThingAssetId.propTypes = {
  containerModel: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

