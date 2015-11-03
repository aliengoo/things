"use strict";

import React, {Component, PropTypes} from 'react';

export default class ThingAbortBtn extends Component {
  render() {
    return (
      <button className="btn btn-danger" type="button" onClick={this.props.abortEditingThing}>Edit</button>
    );
  }
}

ThingAbortBtn.propTypes = {
  abortEditingThing: PropTypes.func.isRequired
};