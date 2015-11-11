"use strict";

import React, {Component, PropTypes} from 'react';

export default class ThingsFilter extends Component {
  render() {
    const {filter, applyFilter} = this.props;

    return (
      <div>
        ThingsFilter
      </div>);
  }
}

ThingsFilter.propTypes = {
  filter: PropTypes.object.isRequired,
  applyFilter: PropTypes.func.isRequired
};
