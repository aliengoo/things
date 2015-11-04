"use strict";

import React, {Component, PropTypes} from 'react';

export default class ThingEditBtn extends Component {
  render() {
    const {thingIsBeingEdited} = this.props;

    return (
      <button className="btn btn-warning" type="button" onClick={this.props.editThing} disabled={thingIsBeingEdited}>Edit</button>
    );
  }
}

ThingEditBtn.propTypes = {
  thingIsBeingEdited: PropTypes.bool,
  editThing: PropTypes.func.isRequired
};