"use strict";

import React, {Component, PropTypes} from 'react';

export default class ThingSelect extends Component {
  constructor() {
    super();
    this._onChange = this._onChange.bind(this);
  }

  _onChange(event) {
    const {validate, thingProperty, setValue} = this.props;

    if (validate) {
      validate(thingProperty, event.target);
    }

    setValue(thingProperty, event.target.value);
  }

  render() {
    const {thing, thingProperty, excludeBlank, options, required} = this.props;

    let actualOptions = excludeBlank ? [...options] : ["", ...options];

    let viewOptions = actualOptions.map((option, key) =>
      <option value={option} key={key}>{option}</option>);

    return (
      <div className="thing-editable thing-select">
        <select
          className="form-control"
          onChange={this._onChange}
          value={thing[thingProperty]}
          required={required}>
          {viewOptions}
        </select>
      </div>
    );
  }
}

ThingSelect.propTypes = {
  excludeBlank: PropTypes.bool,
  required: PropTypes.bool,
  options: PropTypes.array,
  thing: PropTypes.object,
  validate: PropTypes.func,
  thingProperty: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired
};