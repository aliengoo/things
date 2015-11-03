"use strict";

import React, {Component, PropTypes} from 'react';
import Alert from '../../../components/alert';

export default class ThingWasDeletedWarning extends Component {
  render() {
    var content = (<div></div>);

    if (this.props.thingWasDeleted) {
      content =
        (<div className="thing-was-deleted-warning">
          <Alert alertType={"danger"}>
            The thing you are currently viewing was deleted
          </Alert>
        </div>);
    }

    return content;
  }
}

ThingWasDeletedWarning.propTypes = {
  thingWasDeleted: PropTypes.bool.isRequired
};