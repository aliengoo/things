"use strict";

import React, {Component, PropTypes} from 'react';

export default class FaIcon extends Component {
  render() {
    const {spinOnFetching, isFetching, name} = this.props;

    let className = `fa ${name}`;

    if (spinOnFetching && isFetching) {
      className = "fa fa-refresh fa-spin";
    }

    return (
      <i className={className}/>
    );
  }
}

FaIcon.propTypes = {
  spinOnFetching: PropTypes.bool,
  isFetching: PropTypes.bool,
  name: PropTypes.string.isRequired
};

FaIcon.defaultProps = {
  spinOnFetching: false,
  isFetching: false
};