"use strict";

import React, {Component, PropTypes} from 'react';

export default class ThingAbortBtn extends Component {
  render() {
    const {thingIsBeingEdited, abortEditingThing} = this.props;

    if (thingIsBeingEdited) {
      return (<button
        className="btn btn-danger"
        type="button"
        onClick={abortEditingThing}
        visible={thingIsBeingEdited}>Abort</button>);
    } else {
      return <div></div>;
    }
  }
}

ThingAbortBtn.propTypes = {
  thingIsBeingEdited: PropTypes.bool,
  abortEditingThing: PropTypes.func.isRequired
};