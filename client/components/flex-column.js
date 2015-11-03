"use strict";
import React, {Component} from 'react';

export default class FlexColumn extends Component {
  render() {
    return (
      <div className="flex-column">
        {this.props.children}
      </div>
    );
  }
}