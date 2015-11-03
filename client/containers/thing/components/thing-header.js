"use strict";

import React, {Component, PropTypes} from 'react';

export default class ThingHeader extends Component {
  render() {
    let klassName;
    let content;

    if (this.props.thing === null || (this.props.thing.name || "").trim().length === 0) {
      klassName = "thing-header-with-no-name";
      content = "The thing has no name";
    } else {
      content = this.props.thing.name;
    }

    return (
      <header className="thing-header">
        <h2 className={klassName}>
          {content}
        </h2>
      </header>
    );
  }
}

ThingHeader.propTypes = {
  thingIsBeingEdited: React.PropTypes.bool.isRequired,
  container: PropTypes.string.isRequired,
  thing: PropTypes.thing.isRequired
};