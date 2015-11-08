"use strict";

import React, {Component, PropTypes} from 'react';

export default class ThingHeader extends Component {
  render() {
    const {thing, thingIsBeingEdited} = this.props;

    let klassName;
    let content;

    if (thing && thing.name) {
      content = this.props.thing.name;
    } else {
      klassName = "thing-header-with-no-name";
      content = "The thing has no name";
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
  thingIsBeingEdited: PropTypes.bool,
  thingName: PropTypes.object
};