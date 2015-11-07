"use strict";

import React, {Component, PropTypes} from 'react';
import Alert from '../../components/outlets/alert';

export default class ModelBroadcastDeletedAlert extends Component {
  render() {
    var content = (<div></div>);

    if (this.props.externalDelete) {
      content =
        (<div className="model-broadcast-deleted-alert">
          <Alert alertType={"danger"}>
            The thing you are currently viewing was deleted
          </Alert>
        </div>);
    }

    return content;
  }
}

ModelBroadcastDeletedAlert.propTypes = {
  externalDelete: PropTypes.bool
};
