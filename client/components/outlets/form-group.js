"use strict";

import React, {Component, PropTypes} from 'react';

export default class FormGroup extends Component {
  render() {
    let formGroupClassName = "form-group";
    const {formElementState, property} = this.props;

    if (formElementState && property) {
      let elementState = formElementState[property];

      if (elementState) {
        if (elementState.$dirty) {
          if (elementState.$validity.valid) {
            formGroupClassName = `${formGroupClassName} has-success`;
          } else {
            formGroupClassName = `${formGroupClassName} has-error`;
          }
        }
      }

    } else if (formElementState  && !property) {
      console.warn("Did you mean to set the property for this form group?");
    }


    return (
      <div className={formGroupClassName}>
        {this.props.children}
      </div>
    );
  }
}

FormGroup.propTypes = {
  property: PropTypes.string,
  formElementState: PropTypes.object
};