"use strict";

import React, {Component, PropTypes} from 'react';

export default class ThingsTable extends Component {
  render() {
    return (<div className="things-table">
      {"Things table"}
    </div>);
  }
}

ThingsTable.propTypes = {
  things: PropTypes.array.isRequired,
  openThing: PropTypes.func.isRequired
};