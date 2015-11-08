"use strict";

import React, {Component, PropTypes} from 'react';
import ModelFormGroupInlet from '../../../../model/components/ModelFormGroupInlet';

export default class ThingDescription extends Component {
  render() {
    const {containerModel, onChange} = this.props;

    return (<ModelFormGroupInlet
      label="Description"
      tag="textarea"
      modelProperty="description"
      defaultValue=""
      html5InputOptions={{"placeholder": "Enter a description", "rows": 10}}
      containerModel={containerModel}
      onChange={onChange}
    />);
  }
}

ThingDescription.propTypes = {
  containerModel: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

