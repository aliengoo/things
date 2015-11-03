"use strict";

import React, {Component, PropTypes} from 'react';

export default class ThingDeleteBtn extends Component {
  render() {
    return (
      <button className="btn btn-danger" type="button" onClick={this.props.deleteThing}>Delete</button>
    );
  }
}

ThingDeleteBtn.propTypes = {
  deleteThing: PropTypes.func.isRequired
};