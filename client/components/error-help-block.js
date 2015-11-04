"use strict";

import React, {Component, PropTypes} from 'react';

/**
 * See https://developer.mozilla.org/en-US/docs/Web/API/ValidityState
 *
 * Each child under ErrorHelpBlock must match the name of the property on the validityState exactly
 */
export default class ErrorHelpBlock extends Component {
  render() {
    const {formElementState, property} = this.props;

    if (formElementState && formElementState[property] && formElementState[property].$validity) {
      let $validity = formElementState[property].$validity;
      let errors = [];

      React.Children.forEach(this.props.children, function (child) {
        if ($validity[child.type] === true) {
          errors.push({type: child.type, content: child.props.children});
        }
      });

      return (
        <div className="error-help-block">
          {errors.map((error, key) => (<div className="help-block" key={key} data-type={error.type}>{error.content}</div>))}
        </div>);
    } else {
      return (<div></div>);
    }
  }
}

ErrorHelpBlock.propTypes = {
  property: PropTypes.string.isRequired,
  formElementState: PropTypes.object
};