"use strict";

import React, {Component, PropTypes} from 'react';

export default class ThingTextInput extends Component {
  constructor() {
    super();
    this._onChange = this._onChange.bind(this);
  }

  _onChange(event) {

    if (this.props.validate) {
      this.props.validate(this.props.thingProperty, event.target);
    }

    this.props.setValue(this.props.thingProperty, event.target.value);
  }

  render() {
    const {thing, thingProperty, minLength, maxLength, required, disabled} = this.props;

    return (
      <div className="thing-text-input">
        <input
          minLength={minLength || 0}
          maxLength={maxLength || 250}
          required={required}
          disabled={disabled}
          type="text"
          onChange={this._onChange}
          className="form-control"
          value={thing[thingProperty]}/>
      </div>);
  }
}

ThingTextInput.propTypes = {
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  validate: PropTypes.func,
  thing: PropTypes.object.isRequired,
  thingProperty: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired
};