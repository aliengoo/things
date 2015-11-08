"use strict";

import React, {Component, PropTypes} from 'react';
import ModelFormGroupInlet from '../../../../model/components/ModelFormGroupInlet';

export default class ThingUser extends Component {
  render() {
    const {containerModel, onChange} = this.props;

    return (<ModelFormGroupInlet
      label="User"
      tag="input"
      modelProperty="user"
      defaultValue=""
      html5InputOptions={{"placeholder": "The assigned user"}}
      containerModel={containerModel}
      onChange={onChange}
    />);
  }
}

ThingUser.propTypes = {
  containerModel: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

