"use strict";

import React, {Component, PropTypes} from 'react';

export default class Form extends Component {
  render() {
    const {children, name} = this.props;
    return (
      <form name={name}>
        {children}
      </form>);
  }
}

Form.propTypes = {
  name: PropTypes.string.isRequired
};



