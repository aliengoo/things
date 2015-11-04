"use strict";

import React, {Component, PropTypes} from 'react';

export default class ThingStaticValue extends Component {
  render() {
    const {thing, thingProperty, defaultValue} = this.props;

    let thingValue = (thing && thing[thingProperty]) ? thing[thingProperty] : (defaultValue || "[EMPTY]");

    return (<div className="thing-viewable">
      <p className="form-control-static">{thingValue}</p>
    </div>);
  }
}

ThingStaticValue.propTypes = {
  thingProperty: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  thing: PropTypes.object
};