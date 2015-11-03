"use strict";

import React, {Component, PropTypes} from 'react';

export default class ThingsPagination extends Component {
  render() {
    return (<div className="things-pagination">
      {"Things pagination"}
    </div>);
  }
}

ThingsPagination.propTypes = {
  thingsPage: PropTypes.object.isRequired
};