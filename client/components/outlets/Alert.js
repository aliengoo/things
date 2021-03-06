"use strict";

import React from 'react';

export default class Alert extends React.Component {

  render() {
    var className = `alert alert-${this.props.alertType || 'info'}`;

    return (
      <div className={className} role="alert" alert-dismissible>
        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}