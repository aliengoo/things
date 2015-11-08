"use strict";

import React, {Component, PropTypes} from 'react';

/**
 * See https://developer.mozilla.org/en-US/docs/Web/API/ValidityState
 *
 * Each child under ErrorHelpBlock must match the name of the property on the validityState exactly
 */
export default class ModelError extends Component {
  render() {
    const {modelState} = this.props;

    if (modelState.valid) {
      let $validity = modelState.$validity;
      let errors = [];

      React.Children.forEach(this.props.children, function (child) {
        if ($validity[child.type] === true) {
          errors.push({type: child.type, content: child.props.children});
        }
      });

      return (
        <div className="model-error">
          {errors.map((error, key) => (<div className="model-error-item" key={key} data-type={error.type}>{error.content}</div>))}
        </div>);
    } else {
      return (<div></div>);
    }
  }
}

ModelError.propTypes = {
  modelState: PropTypes.object
};