"use strict";

import React, {Component, PropTypes} from 'react';
import ThingWasDeletedAlert from './thing-was-deleted-alert';
import ThingWasUpdatedAlert from './thing-was-updated-alert';

export default class ThingAlerts extends Component {
  render() {
    const {thingWasDeleted, thingWasUpdated} = this.props;

    return (<div className="thing-alerts">
      <ThingWasDeletedAlert thingWasDeleted={thingWasDeleted}/>
      <ThingWasUpdatedAlert thingWasUpdated={thingWasUpdated}/>
    </div>);
  }
}

ThingAlerts.propTypes = {
  thingWasDeleted: PropTypes.bool,
  thingWasUpdated: PropTypes.bool
};
