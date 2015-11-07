"use strict";

import React, {Component, PropTypes} from 'react';
import ThingWasDeletedAlert from './thing-was-deleted-alert';
import ThingWasUpdatedAlert from './thing-was-updated-alert';

export default class ModelBroadcastAlerts extends Component {
  render() {
    const {externalDelete, externalUpdate} = this.props;

    return (<div className="model-broadcast-alerts">
      <ThingWasDeletedAlert externalDelete={externalDelete}/>
      <ThingWasUpdatedAlert externalUpdate={externalUpdate}/>
    </div>);
  }
}

ModelBroadcastAlerts.propTypes = {
  externalDelete: PropTypes.bool,
  externalUpdate: PropTypes.bool
};
