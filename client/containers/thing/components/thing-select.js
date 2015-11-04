"use strict";

import React, {Component, PropTypes} from 'react';

export default class ThingSelect extends Component {
  constructor() {
    super();
    this._onChange = this._onChange.bind(this);
  }

  _onChange(event) {
    this.props.setValue(event.target.value);
  }

  render() {
    const {thing, thingProperty, excludeBlank, options} = this.props;

    let actualOptions = excludeBlank ? [...options] : ["", ...options];

    let viewOptions = actualOptions.map((option, key) =>
      <option value={option} key={key}>{option}</option>);

    return (
      <div className="thing-editable thing-select">
        <select className="form-control" onChange={this._onChange} value={thing[thingProperty]}>
          {viewOptions}
        </select>
      </div>
    );
  }
}

ThingSelect.propTypes = {
  excludeBlank: PropTypes.bool,
  options: PropTypes.array,
  thing: PropTypes.object,
  thingProperty: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired
};