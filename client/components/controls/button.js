"use strict";

import _ from 'lodash';
import React, {Component, PropTypes} from 'react';

const btnStyles = ["default", "primary", "success", "info", "warning", "danger"];

export default class Button extends Component {
  render() {
    const {
      isFetching,
      children,
      disabled,
      visible,
      onClick,
      btnStyle} = this.props;

    if (!visible) {
      return (<div data-button-placeholder="button-not-visible"></div>);
    }

    let actualBtnStyle = "btn-default";

    if (_.contains(btnStyles, btnStyle)) {
      actualBtnStyle = `btn-${btnStyle}`;
    } else {
      console.warn(`The btnStyle property ${btnStyle} was not recognised`);
    }

    const className = `btn ${actualBtnStyle}`;

    return (
      <button
        className={className}
        type="button"
        onClick={onClick}
        disabled={disabled || isFetching}>
        {children}
      </button>
    );
  }
}

Button.propTypes = {
  isFetching: PropTypes.bool,
  btnStyle: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  onClick: PropTypes.func.isRequired
};

Button.defaultProps = {
  btnStyle: "default",
  disabled: false,
  visible: true
};