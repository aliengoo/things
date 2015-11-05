"use strict";

import React, {Component, PropTypes} from 'react';
import Alert from '../../../../components/outlets/alert';

export default class ThingWasUpdatedWarning extends Component {
  render() {
    var content = (<div></div>);

    if (this.props.thingWasUpdated) {
      content =
        (<div className="thing-was-updated-alert">
          <Alert alertType={"warning"}>
            Another user has updated this thing
          </Alert>
        </div>);
    }

    return content;
  }
}

ThingWasUpdatedWarning.propTypes = {
  thingWasUpdated: PropTypes.bool
};