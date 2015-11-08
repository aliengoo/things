"use strict";

import React, {Component, PropTypes} from 'react';

export default class FormGroup extends Component {
  render() {
    return (
      <div className="form-group">
        {this.props.children}
      </div>
    );
  }
}