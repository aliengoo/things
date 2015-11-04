"use strict";

import React, {Component, PropTypes} from 'react';

export default class ThingUpdateBtn extends Component {
  render() {
    return (
      <button className="btn btn-warning" type="button" onClick={this.props.updateThing}>Update</button>
    );
  }
}

ThingUpdateBtn.propTypes = {
  updateThing: PropTypes.func.isRequired
};