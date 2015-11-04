"use strict";

import React, {Component, PropTypes} from 'react';
import FormGroup from './form-group';
import ControlLabel from './control-label';

export default class FormGroupInput extends Component {

  constructor() {
    super();

    this._renderEditable = this._renderEditable.bind(this);
    this._renderViewable = this._renderViewable.bind(this);
  }

  render() {
    const {
      label,
      isEditable
      } = this.props;

    return (
      <FormGroup>
        <ControlLabel>{label}</ControlLabel>
        {isEditable ? this._renderEditable() : this._renderViewable()}
      </FormGroup>
    );
  }

  _renderEditable() {
    const {
      name,
      value,
      inputType,
      placeholder
    } = this.props;

    let input = React.createElement("input", {
      name,
      value,
      placeholder
    });


    return (
      <input
        type={inputType}
      />
    );
  }

  _renderViewable() {
    return (
      <div>
        <p className="form-control-static">
          {this.props.value}
        </p>
      </div>
    );
  }
}

FormGroupInput.propTypes = {
  placeholder: PropTypes.string,
  inputType: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  parse: PropTypes.func,
  format: PropTypes.func,
  label: PropTypes.string,
  isEditable: PropTypes.bool
};

FormGroupInput.defaultProps = {
  inputType: "text",
  label: "Label property missing"
};
