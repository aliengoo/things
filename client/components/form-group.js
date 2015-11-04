"use strict";

import React, {Component, PropTypes} from 'react';

export default class FormGroup extends Component {
  render() {
    const {validityState} = this.props;

    let stateKlassName = "form-group";

    if (validityState) {
        if (!validityState.valid) {
          stateKlassName += " has-error";
        }
    }

    return (
      <div className={stateKlassName}>
        {this.props.children}
      </div>
    );
  }
}

FormGroup.propTypes = {
  validityState: PropTypes.object
};