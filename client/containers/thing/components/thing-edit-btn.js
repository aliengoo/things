"use strict";

import React, {Component, PropTypes} from 'react';

export default class ThingEditBtn extends Component {
  render() {
    return (
      <button className="btn btn-warning" type="button" onClick={this.props.editThing}>Edit</button>
    );
  }
}

ThingEditBtn.propTypes = {
  editThing: PropTypes.func.isRequired
};