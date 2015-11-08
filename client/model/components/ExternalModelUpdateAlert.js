"use strict";

import React, {Component, PropTypes} from 'react';
import Alert from '../../components/outlets/Alert';

export default class ExternalModelUpdateAlert extends Component {
  render() {
    if (this.props.externalUpdate) {
      return <Alert>The current model has been updated by another user.</Alert>;
    }
    return <div></div>;
  }
}

ExternalModelUpdateAlert.propTypes = {
  externalUpdate: PropTypes.bool
};
