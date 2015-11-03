"use strict";

import React, {Component, PropTypes} from 'react';

export default class ThingsFilter extends Component {
  render() {
    return (<div className="things-filter">
      {"Things filter"}
    </div>);
  }
}

ThingsFilter.propTypes = {
  thingsFilter: PropTypes.object.isRequired
};