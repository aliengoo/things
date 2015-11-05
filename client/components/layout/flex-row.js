"use strict";
import React, {Component} from 'react';

export default class FlexRow extends Component {
  render() {
    return (
      <div className="flex-row">
        {this.props.children}
      </div>
    );
  }
}