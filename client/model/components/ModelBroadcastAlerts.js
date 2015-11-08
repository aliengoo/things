"use strict";

import React, {Component, PropTypes} from 'react';
import ExternalModelDeleteAlert from './ExternalModelDeleteAlert';
import ExternalModelUpdateAlert from './ExternalModelUpdateAlert';

export default class ModelBroadcastAlerts extends Component {
  render() {
    const {externalDelete, externalUpdate} = this.props;

    return (<div className="model-broadcast-alerts">
      <ExternalModelDeleteAlert externalDelete={externalDelete}/>
      <ExternalModelUpdateAlert externalUpdate={externalUpdate}/>
    </div>);
  }
}

ModelBroadcastAlerts.propTypes = {
  externalDelete: PropTypes.bool,
  externalUpdate: PropTypes.bool
};
