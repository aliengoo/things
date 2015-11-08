"use strict";

import React, {Component, PropTypes} from 'react';
import Alert from '../../components/outlets/Alert';

export default class ExternalModelDeleteAlert extends Component {
  render() {
    if (this.props.externalDelete) {
      return <Alert>The current model has been deleted by another user.</Alert>;
    }
    return <div></div>;
  }
}

ExternalModelDeleteAlert.propTypes = {
  externalDelete: PropTypes.bool
};
